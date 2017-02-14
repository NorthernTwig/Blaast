export default async (ctx, next) => {
  const { _id } = ctx.request.body

  if (_id === undefined) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from DELETE. { _id } is missing.'
    }
  }
  await next()
}