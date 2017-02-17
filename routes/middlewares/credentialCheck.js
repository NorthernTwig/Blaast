export default async (ctx, next) => {
  const { username, password } = ctx.request.body
  const newUserObject = {
    username,
    password
  }
  if (Object.values(newUserObject).includes(undefined)) {
    return ctx.body = {
      status: ctx.status,
      error: 'Data is missing from POST. { username }, { password } is missing.'
    }
  }
  await next()
}