export default async (ctx, next) => {
  if (ctx.accepts('application/json')) {
    await next()
  } else {
    ctx.throw(400)
  }
}