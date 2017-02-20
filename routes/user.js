import Router from 'koa-router'
import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'
import userSchema from '../models/UserSchema'
import createUserCheck from './middlewares/user/createUser'
import jwt from './middlewares/auth/jwt'
import baseUrl from './libs/baseUrl'
import emitter from './libs/eventBus'
import pagination from './libs/pagination'
import { users as generateSelf } from './libs/generateSelf'
const router = new Router()

router
  .get('users', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 2
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname

    try {
      const users = await userSchema.find({}, 'id username name', { lean: true }) 
          .sort({ 'date': -1 })
          .limit(limit)
          .skip(offset * limit)
      const usersWithSelf = users.map(user => generateSelf(user, ctx))

      ctx.body = pagination(usersWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }

  })
  .get('users/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const path = ctx.req._parsedUrl.pathname

    try {
      const user = await userSchema.findOne({_id}, 'id username name', { lean: true })
      ctx.body = generateSelf(user, ctx)
    } catch(e) {
      ct.throw('Could not find a user with that id', 404)
    }
    
  })
  .post('users', createUserCheck, async (ctx, next) => {
    const { username, password, name } = ctx.request.body
    const saltRounds = 10

    try {
      const hashedPassword = await hash(password, saltRounds)
      await userSchema.create({
        password: hashedPassword,
        username,
        name
      })
      ctx.body = `The user "${username}" has been created`
      emitter.emit('user', { username, name })
    } catch(e) {
      ctx.throw('Could not create a user with those credentials', 400)
    }
  })


export default router