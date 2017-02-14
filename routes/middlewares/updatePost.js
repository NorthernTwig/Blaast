export default async (ctx, next) => {
  const { _id } = ctx.params
  const { title, body } = ctx.request.body
  const newPostObject = {
    _id,
    title,
    body
  }
  if (_id === undefined) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from PUT. { title }, { body } or { _id } is missing.'
    }
  }
  await next()
}