export default async (ctx, next) => {
  const { _id } = ctx.params

  if (_id === undefined) {
    return ctx.body = {
      status: ctx.status,
      error: 'Parameter is missing from DELETE. :id is missing.'
    }
  }
  await next()
}