import dotenv from 'dotenv'
dotenv.config()
import Router from 'koa-router'
import jwt from 'jsonwebtoken'

const router = new Router()

router
  .post('login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (username !== undefined && password !== undefined) {
      ctx.status = 200
      ctx.body = {
        token: jwt.sign({ name: username }, process.env.PUBLIC_SECRET),
        message: 'Logged in'
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: 'could not log in'
      }
    }

  })

export default router