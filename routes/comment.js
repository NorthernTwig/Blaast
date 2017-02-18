import Router from 'koa-router'
import CommentSchema from '../models/schemas/CommentSchema'
import jwt from './middlewares/jwt'
import pagination from '../utils/pagination'
const router = new Router()


router
  .get('comments', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    
    const comments = CommentSchema.find({}, '_id body author post date', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

    ctx.body = pagination(comments, ctx.url, limit, offset, path)
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const comment = CommentSchema.findOne({ _id }, '_id body author post date', { lean: true })
    ctx.body = comments  
  })
  .post('comments', jwt, async (ctx, next) => {
    const { body, post } = ctx.request.body

    

  })  

export default router