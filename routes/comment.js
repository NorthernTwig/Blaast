import Router from 'koa-router'
import CommentSchema from '../models/schemas/CommentSchema'
import pagination from '../utils/pagination'
const router = new Router()


router
  .get('comments', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    
    const comments = CommentSchema.find({}, '_id author body date', {lean: true})
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

    ctx.body = pagination(comments, ctx.url, limit, offset, path)
  })
  .get('comments/:_id', async (ctx, next) => {

  })

export default router