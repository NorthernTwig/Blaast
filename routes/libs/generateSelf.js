import baseUrl from './baseUrl'

export const comments = (comment, ctx) => {
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

export const posts = (post, ctx) => {
  return Object.assign(post, {
    author: Object.assign(post.author, {
      self: `${ baseUrl }/users/${ post.author._id }`
    }), 
    comments: `${ baseUrl }/comments/posts/${ post.author._id }`,
    self: `${ baseUrl }${ path }/${ post._id }`
  })
}