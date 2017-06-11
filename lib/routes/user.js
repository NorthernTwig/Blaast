import Router from 'koa-router'
import mongoose from 'mongoose'
import * as user from '../DAL/user'
import createUserCheck from './middlewares/user/createUser'
import updateUserCheck from './middlewares/user/updateUser'
import jwt from './middlewares/auth/jwt'
import baseUrl from './libs/baseUrl'
import emitter from './libs/eventBus'
import pagination from './libs/pagination'
import { users as generateSelf, main as mainSelf } from './libs/generateSelf'

const router = new Router()


router
  .get('users', async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const users = await user.getAll(limit, offset)
      .catch(e => ctx.throw(e.message, e.status))
    const usersWithSelf = users.map(user => generateSelf(user, ctx))
    ctx.body = pagination(usersWithSelf, ctx, limit, offset)
  })
  .get('users/:_id', async (ctx) => {
    const { _id } = ctx.params
    const userInfo = await user.getOne(_id)
      .catch(e => ctx.throw('Could not find a user with that id', 404))
    ctx.body = generateSelf(userInfo, ctx)
  })
  .post('users', createUserCheck, async (ctx) => {
    const { username, name } = ctx.request.body
    const newUser = await user.create(ctx.request.body)
      .catch((e) => {
        e.code === 11000 ?
          ctx.throw('Username is already taken', 409) :
          ctx.throw('Could not create a user with those credentials', e.status)
      })
    const { _id: id } = newUser
    ctx.status = 201
    ctx.set('Location', `${ baseUrl }/users/${ id }`)
    ctx.body = {
      status: ctx.status,
      location: ctx.response.header.location,
      self: mainSelf(ctx),
    }
    emitter.emit('user', { username, name })
  })
  .patch('users', updateUserCheck, jwt, async (ctx) => {
    const { _id } = ctx.state.user
    await user.update(_id, ctx.request.body)
    .catch((e) => {
      e.code === 11000 ?
        ctx.throw('Username is already taken', 409) :
        ctx.throw('Could not update user', e.status)
    })
    ctx.status = 204
  })
  .delete('users', jwt, async (ctx) => {
    const { _id } = ctx.state.user
    await user.remove(_id)
      .catch(e => ctx.throw('Could not delete user', e.status))
    ctx.status = 204
  })

export default router
