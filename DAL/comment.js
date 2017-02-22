import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'

const AUTHOR_ID = 'author._id'
const DELETED_NAME = '[ DELETED ]'
const USER_DATA = '_id body author post date'
const SALT_ROUNDS = 10

export const getAll = async (limit, offset) => {
  return await CommentSchema.find({}, USER_DATA, { lean: true })
    .sort({ 'date': -1 })
    .limit(limit)
    .skip(offset * limit)
}

export const getOne = async _id => {
  return await CommentSchema.findOne({ _id }, USER_DATA, { lean: true })
}

export const getUsersComments = async (limit, offset, _id) => {
  return await CommentSchema.find({ [AUTHOR_ID]: _id  }, USER_DATA, { lean: true })
    .sort({ 'date': -1 })
    .limit(limit)
    .skip(offset * limit)
}

export const getPostsComments = async (limit, offset, _id) => {
  return await CommentSchema.find({ 'post': _id  }, USER_DATA, { lean: true })
    .sort({ 'date': -1 })
    .limit(limit)
    .skip(offset * limit)
}

export const create = async ctx => {
  const { post } = ctx.params
  const { body } = ctx.request.body
  const { name, _id } = ctx.state.user
  const user = await UserSchema.find({ _id })

  if (!user) {
    ctx.throw(401)
  }

  return await new CommentSchema({
    body,
    post,
    author: {
      _id,
      name
    }
  }).save()
}

export const update = async ctx => {
  const { _id } = ctx.params
  const authorId = ctx.state.user._id
  const user = await UserSchema.find({ _id })

  if (!user) {
    ctx.throw(401)
  }

  return await CommentSchema.findOneAndUpdate({ _id, [AUTHOR_ID]: authorId}, ctx.request.body)
}

export const remove = async ctx => {
  const { _id } = ctx.params
  const authorId = ctx.state.user._id
  return await CommentSchema.findOneAndRemove({ _id, [AUTHOR_ID]: authorId})
}