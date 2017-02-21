import Router from 'koa-router'
import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'
import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'
import * as user from '../DAL/userDAL'
import createUserCheck from './middlewares/user/createUser'
import jwt from './middlewares/auth/jwt'
import baseUrl from './libs/baseUrl'
import emitter from './libs/eventBus'
import pagination from './libs/pagination'
import { users as generateSelf } from './libs/generateSelf'
const router = new Router()


router
  .get('users', async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0

    try {
      const users = await user.getAll(limit, offset) 
      const usersWithSelf = users.map(user => generateSelf(user, ctx))

      ctx.body = pagination(usersWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw(e.message, e.status)
    }

  })
  .get('users/:_id', async (ctx, next) => {
    const { _id } = ctx.params

    try {
      const user = await user.getOne(_id)
      ctx.body = generateSelf(user, ctx)
    } catch(e) {
      console.log(e)
      ctx.throw('Could not find a user with that id', 404)
    }
    
  })
  .post('users', createUserCheck, async (ctx, next) => {
    const { username, name } = ctx.request.body

    try {
      await user.create(ctx.request.body)

      ctx.status = 201
      ctx.body = `The user "${ username }" has been created`
      emitter.emit('user', { username, name })
    } catch(e) {
      ctx.throw('Could not create a user with those credentials', 400)
    }
  })
  .patch('users', jwt, async (ctx, next) => {
    const { _id } = ctx.state.user

    try {
      await user.update(_id, ctx.request.body)
      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not update user', e.status)
    }
  })
  .delete('users', jwt, async (ctx, next) => {
    const { _id } = ctx.state.user

    try {
      await user.deleteOne(_id)
      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete user', e.status)
    }
  })

export default router