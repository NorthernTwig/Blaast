import baseUrl from './baseUrl'

export const comments = (comment) => {
  const { _id: id } = comment.author
  const { _id: commentId } = comment

  return Object.assign({}, comment, {
    post: {
      _id: comment.post,
      self: `${ baseUrl }/posts/${ comment.post }`,
    },
    author: Object.assign({}, comment.author, {
      self: `${ baseUrl }/users/${ id }`,
    }),
    self: `${ baseUrl }/comments/${ commentId }`,
  })
}

export const posts = (post) => {
  const { _id: id } = post
  const { _id: authorId } = post.author

  Object.assign({}, post, {
    author: Object.assign({}, post.author, {
      self: `${ baseUrl }/users/${ authorId }`,
    }),
    comments: `${ baseUrl }/comments/posts/${ id }`,
    self: `${ baseUrl }/posts/${ id }`,
  })
}
export const users = (user) => {
  const { _id: id } = user
  return Object.assign({}, user, {
    self: `${ baseUrl }/users/${ id }`,
    posts: `${ baseUrl }/posts/users/${ id }`,
    comments: `${ baseUrl }/comments/users/${ id }`,
  })
}

export const webhooks = (webhook) => {
  const { _id: id } = webhook

  return Object.assign({}, webhook, {
    self: `${ baseUrl }/webhooks/${ id }`,
  })
}
export const main = (ctx) => {
  const { pathname: path } = ctx.req._parsedUrl.pathname

  return `${ baseUrl }${ path }`
}
