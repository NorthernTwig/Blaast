import Router from 'koa-router'
import CommentSchema from '../models/CommentSchema'
import jwt from './middlewares/auth/jwt'
import checkComment from './middlewares/comment/checkComment'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { comments as generateSelf } from './libs/generateSelf'
import baseUrl from './libs/baseUrl'
const router = new Router()


router
  .get('comments', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    
    try {
      let comments = await CommentSchema.find({}, '_id body author post date', { lean: true })
          .sort({ 'date': -1 })
          .limit(limit)
          .skip(offset * limit)

      comments = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(comments, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params

    try {
      const comment = await CommentSchema.findOne({ _id }, '_id body author post date', { lean: true })
      ctx.body = generateSelf(comment, ctx)
    } catch(e) {
      ctx.throw('Could not find a comment with that id', 404)
    }
  })
  .get('comments/users/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    const { _id } = ctx.params

    try {
      const comments = await CommentSchema.find({ 'author._id': _id  }, '_id body author post date', { lean: true })
      
      if (comments.length < 1) {
        ctx.throw(404)
      }

      ctx.body = comments.map(comment => generateSelf(comment, ctx))
    } catch(e) {
      ctx.throw('Could not find comments by user with that id', 404)
    }

  })
  .get('comments/posts/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    const { _id } = ctx.params

    try {
      const comments = await CommentSchema.find({ 'post': _id  }, '_id body author post date', { lean: true })

      if (comments.length < 1) {
        ctx.throw(404)
      }
     
      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw('Could not find comments on post with that id', e.status)
    }
  })
  .post('comments/posts/:post', jwt, checkComment, async (ctx, next) => {
    const { post } = ctx.params
    const { body } = ctx.request.body
    const { name, _id } = ctx.state.user

    try {
      const newComment = await CommentSchema.create({
        body,
        post,
        author: {
          _id,
          name
        }
      })

      ctx.status = 201
      ctx.body = `Comment has been created`
      emitter.emit('comment', newComment)
    } catch (e) {
      ctx.throw('Could not create comment on post with that Id', 400)
    }
  })
  .patch('/comments/:_id', jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const authorId = ctx.state.user._id

    try {
      const updatedComment = await CommentSchema.findOneAndUpdate({ _id, 'author._id': authorId}, ctx.request.body)

      if (updatedComment === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not update comment', e.status)
    }
  })
  .delete('/comments/:_id', jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const authorId = ctx.state.user._id

    try {
      const deletedComment = await CommentSchema.findOneAndRemove({ _id, 'author._id': authorId}, ctx.request.body)

      if (updatedComment === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete comment', e.status)
    }
  })

export default router