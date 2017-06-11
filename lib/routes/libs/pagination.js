import baseUrl from './baseUrl'

export default (array, ctx, limit, offset) => {
  const url = ctx.url
  const path = ctx.req._parsedUrl.pathname

  return [...array, {
    self: `${ baseUrl }${ url }`,
    next: array.length >= limit ? `${ baseUrl }${ path }?offset=${ offset + 1 }&limit=${ limit }` : undefined,
    prev: offset !== 0 ? `${ baseUrl }${ path }?offset=${ offset - 1 }&limit=${ limit }` : undefined,
  }]
}

