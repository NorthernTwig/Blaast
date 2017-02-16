import Router from 'koa-router'
import mongoose from 'mongoose'
import userSchema from '../models/schemas/UserSchema'
import createUserCheck from './middlewares/createUser'
const router = new Router()

router
  .get('users', async (ctx, next) => {
    ctx.body = await userSchema.find({}, 'id username name', {lean: true})
  })
  .get('users/:id', async (ctx, next) => {
    ctx.body = userSchema.find({}, 'id username name')
  })
  .post('users', createUserCheck, async (ctx, next) => {
    const { username, password, name } = ctx.request.body

    try {
      await userSchema.create({
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