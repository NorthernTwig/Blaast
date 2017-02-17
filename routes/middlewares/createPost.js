export default async (ctx, next) => {
  const { title, body } = ctx.request.body
  const newPostObject = {
    title,
    body
  }
  if (Object.values(newPostObject).includes(undefined)) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from POST. { title }, { body } is missing.'
    }
  }
  await next()
}