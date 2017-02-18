import Router from 'koa-router'
import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'
import userSchema from '../models/schemas/UserSchema'
import createUserCheck from './middlewares/createUser'
import baseUrl from './libs/baseUrl'
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
      ctx.body = e
    }

  })
  .get('users/:_id', async (ctx, next) => {
    const { _id } = ctx.params
    const path = ctx.req._parsedUrl.pathname

    try {
      const user = await userSchema.findOne({_id}, 'id username name', { lean: true })
      ctx.body = generateSelf(user, ctx)
    } catch(e) {
      ctx.body = e
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
    } catch(e) {
      ctx.body = 'An error occured' + e
    }
  })

export default router