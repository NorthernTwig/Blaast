export default async (ctx, next) => {
  const { _id } = ctx.params
  const { title, body } = ctx.request.body
  const newPostObject = {
    _id,
    title,
    body
  }

  if (_id === undefined) {
    ctx.throw('The parameter _id is missing', 422)
  }

  if (title === undefined && body === undefined) {
    ctx.data = {
      title: 'ex. How to make an REST api',
      body: 'ex. Your start of with..'
    }
    ctx.throw('The title or body is missing. One of them is needed.', 400)
  }

  await next()
}