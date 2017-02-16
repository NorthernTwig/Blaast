import dotenv from 'dotenv'
dotenv.config()
import jwt from 'koa-jwt'

export default jwt({ secret: process.env.PUBLIC_SECRET })
