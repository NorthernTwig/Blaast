import baseUrl from './baseUrl'

export default (array, url, limit, offset, path) => {

  return [...array, {
        self: `${ baseUrl }${ url }`,
        next: array.length >= limit ? `${ baseUrl }${ path }?offset=${ offset + 1 }&limit=${ limit }` : undefined,
        prev: offset !== 0 ? `${ baseUrl }${ path }?offset=${ offset - 1 }&limit=${ limit }` : undefined
  }]
}

