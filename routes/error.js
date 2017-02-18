import Router from 'koa-router'
const router = new Router()

router.all('*', async (ctx, next) => {

    ctx.body = {
      code: ctx.status,
      message: ctx.message,
      Documentation: ''
    }
  })

export default router