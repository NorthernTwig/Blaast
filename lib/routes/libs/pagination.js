export default (array, ctx, limit, offset) => {
  const url = ctx.url
  const path = ctx.req._parsedUrl.pathname

  return [...array, {
    self: `${ process.env.URL }${ url }`,
    next: array.length >= limit ? `${ process.env.URL }${ path }?offset=${ offset + 1 }&limit=${ limit }` : undefined,
    prev: offset !== 0 ? `${ process.env.URL }${ path }?offset=${ offset - 1 }&limit=${ limit }` : undefined,
  }]
}

