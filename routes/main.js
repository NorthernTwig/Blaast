import Router from 'koa-router'
const router = new Router()

router
  .get('/', async (ctx, next) => {
    ctx.status = 200

    ctx.body = {
      id: 0,
      username: "Northerntwig",
      name: "Oscar Nordquist",
      posts: "http://localhost:3000/posts"
    }

    console.log(ctx)
  })

export default router