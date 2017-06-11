import UserSchema from '../models/UserSchema'
import CommentSchema from '../models/CommentSchema'
import {
  AUTHOR_ID,
  COMMENT_DATA,
} from './constants'

export const getAll = async (limit, offset) =>
  CommentSchema.find({}, COMMENT_DATA, { lean: true })
    .sort({ date: -1 })
    .limit(limit)
    .skip(offset * limit)

export const getOne = async _id =>
  CommentSchema.findOne({ _id }, COMMENT_DATA, { lean: true })

export const getUsersComments = async (limit, offset, _id) =>
  CommentSchema.find({ [AUTHOR_ID]: _id }, COMMENT_DATA, { lean: true })
    .sort({ date: -1 })
    .limit(limit)
    .skip(offset * limit)

export const getPostsComments = async (limit, offset, _id) =>
  CommentSchema.find({ post: _id }, COMMENT_DATA, { lean: true })
    .sort({ date: -1 })
    .limit(limit)
    .skip(offset * limit)


export const create = async (ctx) => {
  const { post } = ctx.params
  const { body } = ctx.request.body
  const { name, _id } = ctx.state.user
  const user = await UserSchema.find({ _id })

  if (!user) {
    ctx.throw(401)
  }

  return new CommentSchema({
    body,
    post,
    author: {
      _id,
      name,
    },
  }).save()
}

export const update = async (ctx) => {
  const { _id } = ctx.params
  const authorId = ctx.state.user._id
  const user = await UserSchema.find({ _id })

  if (!user) {
    ctx.throw(401)
  }

  return CommentSchema.findOneAndUpdate({ _id, [AUTHOR_ID]: authorId }, ctx.request.body)
}

export const remove = async (ctx) => {
  const { _id } = ctx.params
  const authorId = ctx.state.user._id
  return CommentSchema.findOneAndRemove({ _id, [AUTHOR_ID]: authorId })
}
