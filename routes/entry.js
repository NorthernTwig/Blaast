import Router from 'koa-router'
const router = new Router()

router
  .get('/', async (ctx, next) => {
    ctx.body = {
      users: 'http://localhost:3000/users',
      posts: 'http://localhost:3000/posts',
      comments: 'http://localhost:3000/comments'
    }
  })


export default router