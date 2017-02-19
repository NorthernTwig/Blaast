import Router from 'koa-router'
import PostSchema from '../models/PostSchema'
import baseUrl from './libs/baseUrl'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { posts as generateSelf } from './libs/generateSelf'
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
      const posts = await PostSchema.find({}, '_id author title body date', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

      const postsWithSelf = posts.map(post => generateSelf(post, ctx))
      ctx.body = pagination(postsWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }
  })
  .get('posts/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const path = ctx.req._parsedUrl.pathname
    
    try {
      const post = await PostSchema.findOne({ _id }, '_id author title body date', { lean: true })
      ctx.body = generateSelf(post, ctx)
    } catch(e) {
      ctx.throw('Could not find a post with that id', 404)
    }
  })
  .get('posts/users/:_id', async (ctx, next) => {
    const { _id } = ctx.params 
    const limit = parseInt(ctx.query.limit) || 3
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname

    try {
      const posts = await PostSchema.find({ 'author._id': _id }, '_id title body author date', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)
      
      if (posts.length <= 0) {
        ctx.thorw('That user has no posts', 404)
      }

      const postsWithSelf = posts.map(post => generateSelf(post, ctx))

      ctx.body = pagination(postsWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw('Could not find posts by user with that id', 404)
    }
    
  })
  .post('posts', createPostCheck, jwt, async (ctx, next) => {
    const { title, body } = ctx.request.body
    const { name, _id } = ctx.state.user

    try {
      const newPost = await PostSchema.create({
        title,
        body,
        author: {
          _id,
          name
        }
      })
      ctx.status = 201
      ctx.body = `The post "${ title }" has been created`
      emitter.emit('post', newPost)
    } catch(e) {
      ctx.throw('Could not create post', 400)
    }
  })
  .delete('posts/:_id', deletePostCheck, jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const authorId = ctx.state.user._id
    
    try {
      const deletedPost = await PostSchema.findOneAndRemove({ _id, 'author._id': authorId })

      if (deletedPost === null) {
        return ctx.body = 'You do not own this post.'
      }

      ctx.status = 204
      ctx.body = 'Post was successfully deleted.'
    } catch(e) {
      ctx.throw('Could not delete post', 400)
    }
  })
  .patch('posts/:_id', updatePostCheck, jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const authorId = ctx.state.user._id

    try {
      const updatedPost = await PostSchema.findOneAndUpdate({ _id, 'author._id': authorId }, ctx.request.body)

      if (updatedPost === null) {
        ctx.throw('You do not own this post', 403)
      }

      ctx.body = 'Post was successfully updated'
    } catch(e) {
      ctx.throw('Could not update post with that Id', 400)
    }
  })
  
export default router