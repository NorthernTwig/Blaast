import Router from 'koa-router'
import CommentSchema from '../models/CommentSchema'
import jwt from './middlewares/auth/jwt'
import * as comment from '../DAL/comment'
import checkComment from './middlewares/comment/checkComment'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { comments as generateSelf, main as mainSelf } from './libs/generateSelf'
import baseUrl from './libs/baseUrl'
const router = new Router()


router
  .get('comments', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    
    try {
      const comments = await comment.getAll(limit, offset)

      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params

    try {
      const commentInfo = await comment.getOne(_id)
      ctx.body = generateSelf(commentInfo, ctx)
    } catch(e) {
      ctx.throw('Could not find a comment with that id', 404)
    }
  })
  .get('comments/users/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const { _id } = ctx.params

    try {
      const comments = await comment.getUsersComments(limit, offset, _id)
      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw('Could not find comments by user with that id', 404)
    }

  })
  .get('comments/posts/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const { _id } = ctx.params

    try {
      const comments = await comment.getPostsComments(limit, offset, _id)
      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw('Could not find comments on post with that id', e.status)
    }
  })
  .post('comments/posts/:post', jwt, checkComment, async (ctx, next) => {
    try {
      const newComment = await comment.create(ctx)

      ctx.set('Location', `${ baseUrl }/comments/${newComment._id}` )
      ctx.status = 201
      ctx.body = {
        status: ctx.status,
        location: ctx.response.header.location,
        self: mainSelf(ctx)
      }
      emitter.emit('comment', newComment)
    } catch (e) {
      ctx.throw('Could not create comment on post with that Id', 400)
    }
  })
  .patch('/comments/:_id', jwt, checkComment, async (ctx, next) => {
    try {
      const updatedComment = await comment.update(ctx)

      if (updatedComment === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not update comment', e.status)
    }
  })
  .delete('/comments/:_id', jwt, async (ctx, next) => {
    try {
      const deletedComment = await comment.remove(ctx)

      if (!deletedComment) {
        ctx.throw(404)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete comment', e.status)
    }
  })

export default router