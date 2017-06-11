import Router from 'koa-router'
import * as post from '../DAL/post'
import baseUrl from './libs/baseUrl'
import pagination from './libs/pagination'
import emitter from './libs/eventBus'
import { posts as generateSelf, main as mainSelf } from './libs/generateSelf'
import createPostCheck from './middlewares/post/createPost'
import deletePostCheck from './middlewares/post/deletePost'
import updatePostCheck from './middlewares/post/updatePost'
import jwt from './middlewares/auth/jwt'

const router = new Router()


router
  .get('posts', async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const posts = await post.getAll(limit, offset)
      .catch(e => ctx.throw(e.message, e.status))
    const postsWithSelf = posts.map(post => generateSelf(post, ctx))
    ctx.body = pagination(postsWithSelf, ctx, limit, offset)
  })
  .get('posts/:_id', async (ctx) => {
    const { _id } = ctx.params
    const postInfo = await post.getOne(_id)
      .catch(() => ctx.throw('Could not find a post with that id', 404))
    ctx.body = generateSelf(postInfo, ctx)
  })
  .get('posts/users/:_id', async (ctx) => {
    const { _id } = ctx.params
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const posts = await post.getUsersPost(_id, limit, offset)
      .catch((e) => {
        e.status = e.name === 'CastError' ? 404 : 500
        ctx.throw('Could not find posts by user with that id', e.status)
      })
    const postsWithSelf = posts.map(post => generateSelf(post, ctx))
    ctx.body = pagination(postsWithSelf, ctx, limit, offset)
  })
  .post('posts', createPostCheck, jwt, async (ctx) => {
    const newPost = await post.create(ctx)
      .catch(() => ctx.throw('Could not create post', 400))
    const { _id: id } = newPost
    ctx.set('Location', `${ baseUrl }/posts/${ id }`)
    ctx.status = 201
    ctx.body = {
      status: ctx.status,
      location: ctx.response.header.location,
      self: mainSelf(ctx),
    }
    emitter.emit('post', newPost)
  })
  .patch('posts/:_id', updatePostCheck, jwt, async (ctx) => {
    const updatedPost = await post.update(ctx)
      .catch(e => ctx.throw('Could not update post with that id', e.status))

    if (updatedPost === null) {
      ctx.throw(403)
    }
    ctx.status = 204
  })
  .delete('posts/:_id', deletePostCheck, jwt, async (ctx) => {
    const deletedPost = await post.remove(ctx)
      .catch(e => ctx.throw('Could not delete post', e.status))

    if (deletedPost === null) {
      ctx.throw(403)
    }

    ctx.status = 204
  })
  
export default router
