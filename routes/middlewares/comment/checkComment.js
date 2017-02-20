export default async (ctx, next) => {
  const { body } = ctx.request.body

  if (body === undefined || body.trim().length < 1) {
    ctx.data = {
      body: 'ex. I believe that your ideas are quite splendid'
    }
    ctx.throw('The comment has to be longer than 1 letter.', 400)
  }

  await next()
}