import Router from 'koa-router'
import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'
import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'
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
    const path = ctx.req._parsedUrl.pathname

    try {
      const users = await UserSchema.find({}, 'id username name', { lean: true }) 
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

      const user = await UserSchema.findOne({ _id }, 'id username name', { lean: true })
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
      await UserSchema.create({
        password: hashedPassword,
        username,
        name
      })

      ctx.status = 201
      ctx.body = `The user "${username}" has been created`
      emitter.emit('user', { username, name })
    } catch(e) {
      ctx.throw('Could not create a user with those credentials', 400)
    }
  })
  .patch('users', jwt, async (ctx, next) => {
    const { _id } = ctx.state.user
    const saltRounds = 10
    let body = ctx.request.body

    try {
      if (!body.password) {
        const password = await hash(body.password, saltRounds)
        body = Object.assign({}, body, {
          password
        })
      }

      await UserSchema.findOneAndUpdate({ _id }, body)
      
      if (ctx.request.body.username) {
        await PostSchema.update({ 'author._id': _id }, { 'author.name': ctx.request.body.username }, { multi: true })
        await CommentSchema.update({ 'author._id': _id }, { 'author.name': ctx.request.body.username }, { multi: true })
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not update user', e.status)
    }
  })
  .delete('users', jwt, async (ctx, next) => {
    const { _id } = ctx.state.user

    try {
      await UserSchema.findOneAndRemove({ _id })
      await PostSchema.update({ 'author._id': _id }, { 'author.name': '[ deleted ]' }, { multi: true })
      await CommentSchema.update({ 'author._id': _id }, { 'author.name': '[ deleted ]' }, { multi: true })

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete user', e.status)
    }
  })

export default router