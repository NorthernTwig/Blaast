import dotenv from 'dotenv'
import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import * as auth from '../DAL/auth'
import credentialCheck from './middlewares/auth/checkCredential'
import { main as mainSelf } from './libs/generateSelf'

const router = new Router()
dotenv.config()


router
  .post('auth', credentialCheck, async (ctx, next) => {
    const { username } = ctx.request.body
    try {
      const user = await auth.getUser(username)
      const { _id: id } = user
      ctx.status = 200
      ctx.body = {
        token: jwt.sign({ name: username, _id: id }, process.env.PUBLIC_SECRET, { expiresIn: '10 days' }),
        message: 'Logged in',
        self: mainSelf(ctx),
      }
    } catch (e) {
      ctx.throw('A user with the entered credentials could not be found', 403)
    }
  })

export default router
