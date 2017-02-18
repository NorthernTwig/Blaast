export default async (ctx, next) => {
  const { endpoint, scope } = ctx.request.body
  const newPostObject = {
    endpoint,
    scope,
  }

  if (endpoint === undefined && scope === undefined) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from PATCH. { endpoint } or { scope: ex. ["push", "comments", "posts", "users"] } is missing.'
    }
  }

  await next()
}