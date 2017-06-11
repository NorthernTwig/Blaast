export const comments = (comment) => {
  const { _id: id } = comment.author
  const { _id: commentId } = comment

  return Object.assign({}, comment, {
    post: {
      _id: comment.post,
      self: `${ process.env.URL }/posts/${ comment.post }`,
    },
    author: Object.assign({}, comment.author, {
      self: `${ process.env.URL }/users/${ id }`,
    }),
    self: `${ process.env.URL }/comments/${ commentId }`,
  })
}

export const posts = (post) => {
  const { _id: id } = post
  const { _id: authorId } = post.author

  return Object.assign({}, post, {
    author: Object.assign({}, post.author, {
      self: `${ process.env.URL }/users/${ authorId }`,
    }),
    comments: `${ process.env.URL }/comments/posts/${ id }`,
    self: `${ process.env.URL }/posts/${ id }`,
  })
}
export const users = (user) => {
  const { _id: id } = user
  return Object.assign({}, user, {
    self: `${ process.env.URL }/users/${ id }`,
    posts: `${ process.env.URL }/posts/users/${ id }`,
    comments: `${ process.env.URL }/comments/users/${ id }`,
  })
}

export const webhooks = (webhook) => {
  const { _id: id } = webhook

  return Object.assign({}, webhook, {
    self: `${ process.env.URL }/webhooks/${ id }`,
  })
}
export const main = (ctx) => {
  const { pathname: path } = ctx.req._parsedUrl

  return `${ process.env.URL }${ path }`
}
