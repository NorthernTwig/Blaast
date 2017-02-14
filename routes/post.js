import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
import createPostCheck from './middlewares/createPost'
import deletePostCheck from './middlewares/deletePost'
import updatePostCheck from './middlewares/updatePost'
import organize from './utils/organize'
const router = new Router()



router
  .get('posts', async (ctx, next) => {
    try {
      let posts = await PostSchema.find({}, '_id author title body').sort({'date': -1}).limit(20)
      posts = [...posts, { self: ctx.url }]
      ctx.body = posts
    } catch(e) {
      ctx.body = 'Could not display any posts'
    }
  })
  .get('posts/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    
    try {
      const post = await PostSchema.findOne({_id})
      ctx.body = organize(post)
    } catch(e) {
      ctx.body = `Could not find a post with the id: { ${_id} }`
    }
  })
  .get('post/user/:author', async (ctx, next) => {
    const { author } = ctx.params

    try {
      ctx.body = await PostSchema.find({author})
    } catch(e) {
      ctx.body = `The user ${author} has not created any posts.`
    }
  })
  .post('posts', createPostCheck, async (ctx, next) => {
    const { title, body, author } = ctx.request.body

    try {
      const newPost = await PostSchema.create({
        title,
        body,
        author
      })

      ctx.status = 201
      ctx.response.header['Access-Control-Expose-Headers'] = `Location`
      ctx.response.header['Location'] = `http://localhost:3000/posts/${ newPost._id }`
      ctx.body = `The post "${title}" has been created`
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
      const post = await PostSchema.findOne({ _id })
      const sanitizedPost = post.toObject()
      const updatedPost = Object.assign({}, sanitizedPost, ctx.request.body)
      await PostSchema.findOneAndUpdate({ _id }, updatedPost)
      ctx.body = 'Post was successfully updated'
    } catch(e) {
      ctx.body = 'Could not update post'
    }
  })
  

export default router