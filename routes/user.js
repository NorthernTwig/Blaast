import Router from 'koa-router'
import mongoose from 'mongoose'
const router = new Router()

router
  .get('user/:username', async (ctx, next) => {
    ctx.body = {
      id: 0,
      username: ctx.params.username,
      name: "Oscar Nordquist",
      posts: "http://localhost:3000/posts",
      comments: "http://localhost:3000/comments"
    }
  })
  .post('user/create', async (ctx, next) => {
    
  })

export default router