import Router from 'koa-router'
import CommentSchema from '../models/CommentSchema'
import jwt from './middlewares/auth/jwt'
import * as comment from '../DAL/comment'
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
    
    try {
      const comments = comment.getAll(limit, offset)

      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params

    try {
      const commentInfo = comments.getOne(_id)
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
      const comments = comment.getUsersComments(limit, offset, _id)
      
      if (comments.length < 1) {
        ctx.throw(404)
      }

      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, limit, offset)
    } catch(e) {
      ctx.throw('Could not find comments by user with that id', 404)
    }

  })
  .get('comments/posts/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const { _id } = ctx.params

    try {
      const comments = comment.getPostsComments(_id)

      if (comments.length < 1) {
        ctx.throw(404)
      }
     
      const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
      ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw('Could not find comments on post with that id', e.status)
    }
  })
  .post('comments/posts/:post', jwt, checkComment, async (ctx, next) => {
    try {
      const newComment = await comments.create(ctx)

      ctx.status = 201
      ctx.body = `Comment has been created`
      emitter.emit('comment', newComment)
    } catch (e) {
      ctx.throw('Could not create comment on post with that Id', 400)
    }
  })
  .patch('/comments/:_id', jwt, async (ctx, next) => {
    try {
      const updatedComment = comment.update(ctx)

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
      const deletedComment = comment.remove(ctx)

      if (updatedComment === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete comment', e.status)
    }
  })

export default router