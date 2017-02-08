import Router from 'koa-router'
const router = new Router()

router
  .get('post/:id', async (ctx, next) => {
    ctx.body = {
      id: ctx.params.id,
      title: "How to write a REST API",
      author: "Northerntwig",
      author_profile: "http://localhost:3000/user/Northerntwig",
      body: "Lorem Ipsum",
      number_of_comments: 27,
      comments: "http://localhost:3000/comments"
    }
  })
  .get('post/user/:username', async (ctx, next) => {
    ctx.body = [
      {
        id: 0,
        title: "How to write a REST API",
        author: ctx.params.username,
        author_profile: "http://localhost:3000/user/Northerntwig",
        body: "Lorem Ipsum",
        number_of_comments: 27,
        comments: "http://localhost:3000/comments"
      },
      {
        id: 0,
        title: "How to write a REST API",
        author: ctx.params.username,
        author_profile: "http://localhost:3000/user/Northerntwig",
        body: "Lorem Ipsum",
        number_of_comments: 27,
        comments: "http://localhost:3000/comments"
      },
    ]
  })

export default router