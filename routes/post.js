import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
const router = new Router()

router
  .get('post', async (ctx, next) => {
    ctx.body = {
      all_posts: { href: 'http://localhost:3000/posts', method: 'GET' },
      one_post: { href: 'http://localhost:3000/post/{id}', method: 'GET' },
      user_posts: { href: 'http://localhost:3000/posts/user/{username}', method: 'GET' },
      create_post: { href: 'http://localhost:3000/post/create', method: 'POST' },
      delete_post: { href: 'http://localhost:3000/post/delete', method: 'DELETE' },
      update_post: { href: 'http://localhost:3000/post/update', method: 'PUT' }
    }
  })
  .get('posts', async (ctx, next) => {
    try {
      const posts = await PostSchema.find({}).sort({'date': -1}).limit(20)
      const postsWithLink = posts.map((post) => {
        let sanetizedPost = post.toObject()
        sanetizedPost['href'] = `http://localhost:3000/post/${post._id}`
        return sanetizedPost
      })
      ctx.body = postsWithLink
    } catch(e) {
      ctx.body = 'Could not display any posts'
    }
  })
  .get('post/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    
    try {
      ctx.body = await PostSchema.findOne({_id})
    } catch(e) {
      ctx.body = `Could not find a post with the id: ${_id}`
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
  .post('post/create', async (ctx, next) => {
    const { title, body, author } = ctx.request.body

    try {
      await PostSchema.create({
        title,
        body,
        author
      })
      ctx.body = `The post "${title}" has been created`
    } catch(e) {
      ctx.body = 'An error occured'
    }
  })
  .delete('post/delete', async (ctx, next) => {
    const { _id } = ctx.request.body

    try {
      await PostSchema.findOneAndRemove({_id})
      ctx.body = 'Post was successfully deleted.'
    } catch(e) {
      ctx.body = 'Post could not be deleted.'
    }
  })
  .put('post/update', async (ctx, next) => {
    const { _id } = ctx.request.body

    try {
      const post = await PostSchema.findOne({_id})
      const sanitizedPost = post.toObject()
      const updatedPost = Object.assign({}, sanitizedPost, ctx.request.body)
      await PostSchema.findOneAndUpdate({_id}, updatedPost)
      ctx.body = 'Post was successfully updated'
    } catch(e) {
      ctx.body = 'Could not update post'
    }
  })
  

export default router