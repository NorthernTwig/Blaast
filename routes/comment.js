import Router from 'koa-router'
import CommentSchema from '../models/schemas/CommentSchema'
import jwt from './middlewares/jwt'
import pagination from '../utils/pagination'
import domain from '../utils/domain'
const router = new Router()


router
  .get('comments', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    
    let comments = await CommentSchema.find({}, '_id body author post date', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

    comments = comments.map(comment => {
      return 
    })

    ctx.body = pagination(comments, ctx.url, limit, offset, path)
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const comment = await CommentSchema.findOne({ _id }, '_id body author post date', { lean: true })

    ctx.body = Object.assign(comment, {
      post: {
        _id: comment.post,
        self: `${ domain() }/posts/${ comment.post }`
      },
      author: Object.assign(comment.author, {
        self: `${ domain() }/users/${ comment.author._id }`
      }),
      self: `${ domain() }${ ctx.url }`
    })

  })
  .post('comments', jwt, async (ctx, next) => {
    const { body, post } = ctx.request.body
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
    } catch (e) {
      ctx.body = `An error occured. ${e}`
    }
  })

export default router