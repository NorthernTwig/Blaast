import Router from 'koa-router'
import mongoose from 'mongoose'
import userSchema from '../models/schemas/UserSchema'
const router = new Router()

router
  .get('users', async (ctx, next) => {
    ctx.body = await userSchema.find()
  })
  .get('users/:id', async (ctx, next) => {
    ctx.body = {
      id: 0,
      username: ctx.params.username,
      name: 'Oscar Nordquist',
      posts: 'http://localhost:3000/posts',
      comments: 'http://localhost:3000/comments'
    }
  })
  .post('users/:id', async (ctx, next) => {
    const { username, password, name } = ctx.request.body

    

    try {
      await PostSchema.create({
        username,
        password,
        name
      })
      ctx.body = `The user "${username}" has been created`
    } catch(e) {
      ctx.body = 'An error occured'
    }
  })

export default router