const credentialError = (ctx) => {
  ctx.data = {
    username: 'Username has to be longer than 4 letters',
    password: 'Password has to be longer than 4 letters',
    name: 'Your first and lastname must be longer than 2',
  }
  ctx.throw('The username, password, or name is too short', 400)
}

export default async (ctx, next) => {
  const { username, password, name } = ctx.request.body

  if (username && username.length < 4) {
    credentialError(ctx)
  }
  if (password && password.length < 4) {
    credentialError(ctx)
  }
  if (name && name.length < 2) {
    credentialError(ctx)
  }

  await next()
}
