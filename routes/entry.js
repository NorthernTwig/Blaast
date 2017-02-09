import Router from 'koa-router'
const router = new Router()

router
  .get('/', async (ctx, next) => {
    ctx.body = {
      user_links: { href: 'http://localhost:3000/user', method: 'GET' },
      post_links: { href: 'http://localhost:3000/posts', method: 'GET' },
      comment_links: { href: 'http://localhost:3000/comments', method: 'GET' }
    }
  })


export default router