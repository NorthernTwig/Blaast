import dotenv from 'dotenv'
dotenv.config()
import { compare } from 'bcrypt-as-promised'
import credentialCheck from './middlewares/credentialCheck'
import userSchema from '../models/schemas/UserSchema'
import Router from 'koa-router'
import jwt from 'jsonwebtoken'

const router = new Router()

router
  .post('login', credentialCheck, async (ctx, next) => {
    const { username, password } = ctx.request.body
    
    try {
      const user = await userSchema.findOne({username})
      const correctPassword = await compare(password, user.password)
      if (correctPassword) {
        ctx.status = 200
        ctx.body = {
          token: jwt.sign({ name: username, _id: user._id }, process.env.PUBLIC_SECRET),
          message: 'Logged in'
        }
      } else {
        throw new Error('{ password } and { username } did not match')
      }
    } catch(e) {
      ctx.body = e
    }
  })

export default router