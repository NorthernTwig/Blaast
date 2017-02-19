export default async (ctx, next) => {
  const { _id } = ctx.params

  if (_id === undefined) {
    ctx.throw('The delete parameter is missing', 422)
  }
  await next()
}