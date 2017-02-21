import Router from 'koa-router'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'
import * as post from '../DAL/post'
import baseUrl from './libs/baseUrl'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { posts as generateSelf } from './libs/generateSelf'
import createPostCheck from './middlewares/post/createPost'
import deletePostCheck from './middlewares/post/deletePost'
import updatePostCheck from './middlewares/post/updatePost'
import jwt from './middlewares/auth/jwt'
const router = new Router()


router
  .get('posts', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0

    try {
      const posts = await post.getAll(limit, offset)
      const postsWithSelf = posts.map(post => generateSelf(post, ctx))
      ctx.body = pagination(postsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }
  })
  .get('posts/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    
    try {
      const postInfo = await post.getOne(_id)
      ctx.body = generateSelf(postInfo, ctx)
    } catch(e) {
      ctx.throw('Could not find a post with that id', 404)
    }
  })
  .get('posts/users/:_id', async (ctx, next) => {
    const { _id } = ctx.params 
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0

    try {
      const posts = await post.getUsersPost(_id, limit, offset)
      
      if (posts.length <= 0) {
        ctx.throw(404)
      }

      const postsWithSelf = posts.map(post => generateSelf(post, ctx))
      ctx.body = pagination(postsWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw('Could not find posts by user with that id', e.status)
    }
  })
  .post('posts', createPostCheck, jwt, async (ctx, next) => {
    try {
      const newPost = await post.create(ctx)
      ctx.status = 201
      ctx.body = `The post "${ ctx.request.body.title }" has been created`
      emitter.emit('post', newPost)
    } catch(e) {
      ctx.throw('Could not create post', 400)
    }
  })
  .patch('posts/:_id', updatePostCheck, jwt, async (ctx, next) => {
    try {
      const updatedPost = await post.update(ctx)

      if (updatedPost === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not update post with that id', e.status)
    }
  })
  .delete('posts/:_id', deletePostCheck, jwt, async (ctx, next) => {
    
    try {
      const deletedPost = await post.remove(ctx)

      if (deletedPost === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete post', e.status)
    }
  })
  
export default router