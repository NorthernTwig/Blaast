import baseUrl from './baseUrl'

export default (comment, ctx) => {
  return Object.assign(comment, {
    post: {
      _id: comment.post,
      self: `${ baseUrl }/posts/${ comment.post }`
    },
    author: Object.assign(comment.author, {
      self: `${ baseUrl }/users/${ comment.author._id }`
    }),
    self: `${ baseUrl }${ ctx.url }`
  })
}