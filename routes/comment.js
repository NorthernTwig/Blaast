import Router from 'koa-router'
const router = new Router()

router
  .get('comments', async (ctx, next) => {
    ctx.body = 'comments'
  })


export default router