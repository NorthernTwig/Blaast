import Router from 'koa-router'
import { main as mainSelf } from './libs/generateSelf'

const router = new Router()


router
  .get('/', async (ctx) => {
    ctx.body = {
      auth: `${ process.env.URL }/auth`,
      users: `${ process.env.URL }/users`,
      posts: `${ process.env.URL }/posts`,
      comments: `${ process.env.URL }/comments`,
      webhooks: `${ process.env.URL }/webhooks`,
      self: mainSelf(ctx),
    }
  })

export default router
