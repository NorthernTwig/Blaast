export default async (ctx, next) => {
  const { endpoint, scope } = ctx.request.body
  const newPostObject = {
    endpoint,
    scope,
  }

  if (endpoint === undefined && scope === undefined) {
    ctx.documentation = {
      endpoint: 'http://someroute.com', 
      scope: 'push comments posts users (seperate scopes with space)'
    }
    ctx.throw('The endpoint or scope is missing', 400)
  }

  await next()
}