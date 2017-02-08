import Router from 'koa-router'
const router = new Router()

router
  .get('user/:id', async (ctx, next) => {
    ctx.body = {
      id: ctx.params.id,
      username: "Northerntwig",
      name: "Oscar Nordquist",
      posts: "http://localhost:3000/posts",
      comments: "http://localhost:3000/comments"
    }
  })

export default router