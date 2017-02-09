import Router from 'koa-router'
import PostSchema from '../models/schemas/PostSchema'
const router = new Router()

router
  .get('post', async (ctx, next) => {
    try {
      const posts = await PostSchema.find({}).sort({'date': -1}).limit(20)
      ctx.body = posts
    } catch(e) {
      ctx.body = 'Could not display any posts'
    }

  })
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
  .post('post/create', async (ctx, next) => {
    const { title, body, author } = ctx.request.body

    try {
      const rapoo = await PostSchema.create({
        title,
        body,
        author  
      })
      ctx.body = 'Success'
    } catch(e) {
      ctx.body = 'An error occured'
    }

  })
  

export default router