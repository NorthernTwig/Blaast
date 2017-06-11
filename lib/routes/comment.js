import Router from 'koa-router'
import jwt from './middlewares/auth/jwt'
import * as commentDAL from '../DAL/comment'
import checkComment from './middlewares/comment/checkComment'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { comments as generateSelf, main as mainSelf } from './libs/generateSelf'

const router = new Router()


router
  .get('comments', async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const comments = await commentDAL.getAll(limit, offset)
      .catch(e => ctx.throw(e.message, e.status))

    const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
    ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
  })
  .get('comments/:_id', async (ctx) => {
    const { _id } = ctx.params
    const commentInfo = await commentDAL.getOne(_id)
      .catch(() => ctx.throw('Could not find a comment with that id', 404))
    ctx.body = generateSelf(commentInfo, ctx)
  })
  .get('comments/users/:_id', async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const { _id } = ctx.params
    const comments = await commentDAL.getUsersComments(limit, offset, _id)
      .catch(() => ctx.throw('Could not find comments by user with that id', 404))
    const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
    ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
  })
  .get('comments/posts/:_id', async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const { _id } = ctx.params
    const comments = await commentDAL.getPostsComments(limit, offset, _id)
      .catch(e => ctx.throw('Could not find comments on post with that id', e.status))
    const commentsWithSelf = comments.map(comment => generateSelf(comment, ctx))
    ctx.body = pagination(commentsWithSelf, ctx, limit, offset)
  })
  .post('comments/posts/:post', jwt, checkComment, async (ctx) => {
    const newComment = await commentDAL.create(ctx)
      .catch(() => ctx.throw('Could not create comment on post with that Id', 400))
    const { _id: id } = newComment
    ctx.set('Location', `${ process.env.URL }/comments/${ id }`)
    ctx.status = 201
    ctx.body = {
      status: ctx.status,
      location: ctx.response.header.location,
      self: mainSelf(ctx),
    }
    emitter.emit('comment', newComment)
  })
  .patch('/comments/:_id', jwt, checkComment, async (ctx) => {
    const updatedComment = await commentDAL.update(ctx)
      .catch(e => ctx.throw('Could not update comment', e.status))

    if (updatedComment === null) {
      ctx.throw(403)
    }

    ctx.status = 204
  })
  .delete('/comments/:_id', jwt, async (ctx) => {
    const deletedComment = await commentDAL.remove(ctx)
      .catch(e => ctx.throw('Could not delete comment', e.status))
    if (!deletedComment) {
      ctx.throw(404)
    }

    ctx.status = 204
  })

export default router
