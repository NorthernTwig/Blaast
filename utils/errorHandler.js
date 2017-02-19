export default async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.body = {
      status: err.status,
      message: err.message,
      data: ctx.data
    }
  }
}
