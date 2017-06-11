export default async (ctx, next) => {
  const { username, password } = ctx.request.body
  const newUserObject = {
    username,
    password,
  }
  if (Object.values(newUserObject).includes(undefined)) {
    ctx.data = {
      username: 'ex. OrangeSoda',
      password: 'ex. ex. 1-too-cucumberish-4_',
    }
    ctx.throw('The username or password is missing', 400)
  }
  await next()
}
