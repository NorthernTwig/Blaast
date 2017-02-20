import baseUrl from './baseUrl'

export const comments = (comment, ctx) => {
  const path = ctx.req._parsedUrl.pathname
  
  return Object.assign({}, comment, {
    post: {
      _id: comment.post,
      self: `${ baseUrl }/posts/${ comment.post }`
    },
    author: Object.assign({}, comment.author, {
      self: `${ baseUrl }/users/${ comment.author._id }`
    }),
    self: `${ baseUrl }/comments/${comment._id}`
  })
}

export const posts = (post, ctx) => {
  const path = ctx.req._parsedUrl.pathname

  return Object.assign({}, post, {
    author: Object.assign({}, post.author, {
      self: `${ baseUrl }/users/${ post.author._id }`
    }), 
    comments: `${ baseUrl }/comments/posts/${ post._id }`,
    self: `${ baseUrl }${ path }/${ post._id }`
  })
}

export const users = (user, ctx) => {
  const path = ctx.req._parsedUrl.pathname

  return Object.assign({}, user, {
    self: `${ baseUrl }/users/${ user._id }`,
    posts: `${ baseUrl }/posts/users/${ user._id }`,
    comments: `${ baseUrl }/comments/users/${ user._id }`
  })
}

export const webhooks = (webhook, ctx) => {
  const path = ctx.req._parsedUrl.pathname

  return Object.assign({}, webhook, {
    self: `${ baseUrl }/webhooks/${ webhook._id }`
  })
}