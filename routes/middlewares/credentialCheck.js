export default async (ctx, next) => {
  const { username, password, name } = ctx.request.body
  const newUserObject = {
    username,
    password,
    name
  }
  if (Object.values(newUserObject).includes(undefined)) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from POST. { username }, { password } or { name } is missing.'
    }
  }
  await next()
}