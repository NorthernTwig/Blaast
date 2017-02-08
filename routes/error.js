import Router from 'koa-router'
const router = new Router()

router.all('*', async (ctx, next) => {
    ctx.body = {
      code: ctx.status,
      error: 'not a valid request'
    }
  })

export default router