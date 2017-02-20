export default async (ctx, next) => {
  const { _id } = ctx.params
  const { endpoint, scope, secret } = ctx.request.body

  if (_id === undefined) {
    ctx.throw('The parameter _id is missing', 422)
  }

  if (endpoint === undefined && scope === undefined) {
    ctx.data = {
      endpoint: 'ex. http://someroute.com', 
      scope: 'push comments posts users (seperate scopes with space)',
      secret: '(optional) ex. MonkeyBars'
    }
    ctx.throw('The title or body is missing. One of them is needed.', 400)
  }

  await next()
}