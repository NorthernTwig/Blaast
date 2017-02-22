import Router from 'koa-router'
import baseUrl from './libs/baseUrl'
import { main as mainSelf } from './libs/generateSelf'
const router = new Router()


router
  .get('/', async (ctx, next) => {
    ctx.body = {
      users: `${ baseUrl }/users`,
      posts: `${ baseUrl }/posts`,
      comments: `${ baseUrl }/comments`,
      webhooks: `${ baseUrl }/webhooks`,
      self: mainSelf(ctx)
    }
  })

export default router