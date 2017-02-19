import Router from 'koa-router'
import baseUrl from './libs/baseUrl'
const router = new Router()

router
  .get('/', async (ctx, next) => {
    ctx.body = {
      users: `${baseUrl}/users`,
      posts: `${baseUrl}/posts`,
      comments: `${baseUrl}/comments`
    }
  })

export default router