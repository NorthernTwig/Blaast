import dotenv from 'dotenv'
import jwt from 'koa-jwt'

dotenv.config()
export default jwt({ secret: process.env.PUBLIC_SECRET })
