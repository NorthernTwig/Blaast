export default async (ctx, next) => {
  const { title, body } = ctx.request.body
  const newPostObject = {
    title,
    body
  }

  const dataFields = () => ({
    title: 'The title of the blog post',
    body: 'The body of the blog post'
  })

  if (Object.values(newPostObject).includes(undefined)) {
    ctx.data = dataFields()
    ctx.throw('The title or body data does not exist', 400)
  }

  if (newPostObject.title.trim().length === 0 || newPostObject.body.trim().length === 0) {
    ctx.data = dataFields()
    await ctx.throw('The title or body is empty', 400)
  }

  await next()
}