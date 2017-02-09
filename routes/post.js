import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
const router = new Router()

router
  .get('post', async (ctx, next) => {
    try {
      ctx.body = await PostSchema.find({}).sort({'date': -1}).limit(20)
    } catch(e) {
      ctx.body = 'Could not display any posts'
    }
  })
  .get('post/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    
    try {
      ctx.body = await PostSchema.find({_id})
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
      ctx.body = `The post ${title} has been created`
    } catch(e) {
      ctx.body = 'An error occured'
    }
  })
  .delete('post/delete', async (ctx, next) => {
    const {_id} = ctx.request.body

    try {
      await PostSchema.find({_id}).remove()
      ctx.body = 'Post was successfully deleted.'
    } catch(e) {
      ctx.body = 'Post could not be deleted.'
    }
  })
  

export default router