import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
import UserSchema from '../models/schemas/UserSchema'
import domain from '../utils/domain'
import pagination from '../utils/pagination'
import createPostCheck from './middlewares/createPost'
import deletePostCheck from './middlewares/deletePost'
import updatePostCheck from './middlewares/updatePost'
import jwt from './middlewares/jwt'
const router = new Router()

router
  .get('posts', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname

    try {
      let posts = await PostSchema.find({}, '_id author title body', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

      posts = await posts.map(post => {
        return Object.assign(post, {
          self: `${ domain() }${ path }/${ post._id }`
        })
      })

      ctx.body = pagination(posts, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.body = 'Could not display any posts' + e
    }
  })
  .get('posts/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    
    try {
      const post = await PostSchema.findOne({ _id }, '_id author title body', { lean: true })
      ctx.body = Object.assign(post, {
        self: `${ domain() }${ ctx.url }`
      })
    } catch(e) {
      ctx.body = `Could not find a post with the id: { ${ _id } }`
    }
  })
  .get('posts/users/:_id', async (ctx, next) => {
    const { _id } = ctx.params 
    const limit = parseInt(ctx.query.limit) || 3
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname

    try {
      let posts = await PostSchema.find({ 'author._id': _id }, 'title body author', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)
      
      if (posts.length <= 0) {
        throw new Error('No posts from this user found.')
      }

      posts = await posts.map(post => {
        return Object.assign(post, {
          self: `${ domain() }/posts/${ post._id }`
        })
      })

      ctx.body = pagination(posts, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.body = e.message
    }
    
  })
  .post('posts', createPostCheck, jwt, async (ctx, next) => {
    const { title, body } = ctx.request.body

    try {
      const newPost = PostSchema.create({
        title,
        body,
        author: {
          name: ctx.state.user.name,
          _id: ctx.state.user._id
        }
      })

      ctx.status = 201
      ctx.body = `The post "${ title }" has been created`
    } catch(e) {
      ctx.body = 'An error occured'
    }
  })
  .delete('posts/:_id', deletePostCheck, async (ctx, next) => {
    const { _id } = ctx.params

    try {
      await PostSchema.findOneAndRemove({ _id })
      ctx.body = 'Post was successfully deleted.'
    } catch(e) {
      ctx.body = `Post with id: { ${ _id } } could not be deleted.`
    }
  })
  .put('posts/:_id', updatePostCheck, async (ctx, next) => {
    const { _id } = ctx.params

    try {
      await PostSchema.findOneAndUpdate({ _id }, ctx.request.body)
      ctx.body = 'Post was successfully updated'
    } catch(e) {
      ctx.body = 'Could not update post'
    }
  })
  
export default router