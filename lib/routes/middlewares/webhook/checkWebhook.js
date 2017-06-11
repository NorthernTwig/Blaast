export default async (ctx, next) => {
  const { endpoint, scope } = ctx.request.body

  if (endpoint === undefined && scope === undefined) {
    ctx.data = {
      endpoint: 'ex. http://someroute.com',
      scope: 'push comments posts users (seperate scopes with space)',
      secret: '(optional) ex. MonkeyBars',
    }
    ctx.throw('The endpoint or scope is missing', 400)
  }

  await next()
}
