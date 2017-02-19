import Router from 'koa-router'
import CommentSchema from '../models/CommentSchema'
import jwt from './middlewares/jwt'
import commentCheck from './middlewares/commentCheck'
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
      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw('Could not find comments on post with that id', 404)
    }
  })
  .post('comments/posts/:post', jwt, commentCheck, async (ctx, next) => {
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

export default router