import Router from 'koa-router'
import CommentSchema from '../models/schemas/CommentSchema'
import jwt from './middlewares/jwt'
import pagination from './libs/pagination'
import baseUrl from './libs/baseUrl'
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
      return Object.assign(comment, {
        post: {
          _id: comment.post,
          self: `${ baseUrl }/posts/${ comment.post }`
        },
        author: Object.assign(comment.author, {
          self: `${ baseUrl }/users/${ comment.author._id }`
        }),
        self: `${ baseUrl }${ ctx.url }`
      })
    })

    ctx.body = pagination(comments, ctx.url, limit, offset, path)
  })
  .get('comments/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const comment = await CommentSchema.findOne({ _id }, '_id body author post date', { lean: true })
    console.log('fek')
    ctx.body = Object.assign(comment, {
      post: {
        _id: comment.post,
        self: `${ baseUrl }/posts/${ comment.post }`
      },
      author: Object.assign(comment.author, {
        self: `${ baseUrl }/users/${ comment.author._id }`
      }),
      self: `${ baseUrl }${ ctx.url }`
    })

  })
  .get('comments/users/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    const { _id } = ctx.params
    
    let comments = await CommentSchema.find({ 'author._id': _id  }, '_id body author post date', { lean: true })

    comments.map(comment => {
      return Object.assign(comment, {
        post: {
          _id: comment.post,
          self: `${ baseUrl }/posts/${ comment.post }`
        },
        author: Object.assign(comment.author, {
          self: `${ baseUrl }/users/${ comment.author._id }`
        }),
        self: `${ baseUrl }${ ctx.url }`
      })
    })

    ctx.body = comments
  })
  .get('comments/posts/:_id', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    const { _id } = ctx.params

    let comments = await CommentSchema.find({ 'post': _id  }, '_id body author post date', { lean: true })

    comments = comments.map(comment => {
      return Object.assign(comment, {
        post: {
          _id: comment.post,
          self: `${ baseUrl }/posts/${ comment.post }`
        },
        author: Object.assign(comment.author, {
          self: `${ baseUrl }/users/${ comment.author._id }`
        }),
        self: `${ baseUrl }${ ctx.url }`
      })
    })

    ctx.body = pagination(comments, ctx.url, limit, offset, path)
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