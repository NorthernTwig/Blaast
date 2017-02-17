import Router from 'koa-router'
import mongoose from 'mongoose'
import userSchema from '../models/schemas/UserSchema'
import createUserCheck from './middlewares/createUser'
import domain from '../utils/domain'
const router = new Router()

router
  .get('users', async (ctx, next) => {
    const path = ctx.req._parsedUrl.pathname
    let users = await userSchema.find({}, 'id username name', {lean: true}) 

    users = await users.map(user => {
      return Object.assign(user, {
        self: `${ domain() }${ path }/${ user._id }`
      })
    })

    ctx.body = [...users, {self: `${ domain() }${ ctx.url }`}]
  })
  .get('users/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    ctx.body = await userSchema.find({_id}, 'id username name')
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