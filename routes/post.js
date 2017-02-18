import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
import domain from '../utils/domain'
import pagination from '../utils/pagination'
import createPostCheck from './middlewares/createPost'
import deletePostCheck from './middlewares/deletePost'
import updatePostCheck from './middlewares/updatePost'
import userOwnsCheck from './middlewares/userOwns'
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
          author: Object.assign(post.author, {
            self: `${ domain() }/users/${ post.author._id }`
          }), 
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
        author: Object.assign(post.author, {
          self: `${ domain() }/users/${ post.author._id }`
        }), 
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
          author: Object.assign(post.author, {
            self: `${ domain() }/users/${ post.author._id }`
          }), 
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
    const { name, _id } = ctx.state.user

    try {
      const newPost = await PostSchema.create({
        title,
        body,
        author: {
          name,
          _id
        }
      })

      ctx.status = 201
      ctx.body = `The post "${ title }" has been created`
    } catch(e) {
      ctx.body = 'An error occured'
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

      ctx.body = 'Post was successfully deleted.'
    } catch(e) {
      ctx.body = `Post with id: { ${ _id } } could not be deleted. ${e}`
    }
  })
  .put('posts/:_id', updatePostCheck, jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const authorId = ctx.state.user._id

    try {
      const updatedPost = await PostSchema.findOneAndUpdate({ _id, 'author._id': authorId }, ctx.request.body)

      if (updatedPost === null) {
        return ctx.body = 'You do not own this post.'
      }

      ctx.body = 'Post was successfully updated'
    } catch(e) {
      ctx.body = 'Could not update post' + e
    }
  })
  
export default router