import domain from './domain'

export default (array, url, limit, offset, path) => {

  return [...array, {
        self: `${ domain() }${ url }`,
        next: array.length >= limit ? `${ domain() }${ path }?offset=${ offset + 1 }&limit=${ limit }` : undefined,
        prev: offset !== 0 ? `${ domain() }${ path }?offset=${ offset - 1 }&limit=${ limit }` : undefined
  }]
}

