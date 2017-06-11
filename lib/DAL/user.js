import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'
import WebhookSchema from '../models/WebhookSchema'
import {
  AUTHOR_ID,
  AUTHOR_NAME,
  DELETED_NAME,
  USER_DATA,
} from './constants'

export const getAll = async (limit, offset) =>
  UserSchema.find({}, USER_DATA, { lean: true })
    .sort({ date: -1 })
    .limit(limit)
    .skip(offset * limit)

export const getOne = async _id =>
  UserSchema.findOne({ _id }, USER_DATA, { lean: true })

export const create = async (body) => {
  const { password, username, name } = body

  return new UserSchema({
    password,
    username,
    name,
  }).save()
}

export const update = async (_id, body) => {
  await UserSchema.findOneAndUpdate({ _id }, body)

  if (body.username) {
    const userUpdate = [
      { [AUTHOR_ID]: _id },
      { [AUTHOR_NAME]: body.username },
      { multi: true },
    ]
    await PostSchema.update(...userUpdate)
    await CommentSchema.update(...userUpdate)
  }
}

export const remove = async (_id) => {
  await UserSchema.findOneAndRemove({ _id })
  const postsByUser = await PostSchema.find({ [AUTHOR_ID]: _id })
  await PostSchema.remove({ [AUTHOR_ID]: _id })
  await WebhookSchema.remove({ ownerId: _id })
  await CommentSchema.update({ [AUTHOR_ID]: _id }, { [AUTHOR_NAME]: DELETED_NAME }, { multi: true })
  await postsByUser.forEach(async (post) => {
    const { _id: id } = post
    await CommentSchema.remove({ post: id })
  })
}
