export default async (ctx, next) => {
  const { title, body, author } = ctx.request.body
  const newPostObject = {
    title,
    body,
    author
  }
  if (Object.values(newPostObject).includes(undefined)) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from POST. { title }, { body } or { author } is missing.'
    }
  }
  await next()
}