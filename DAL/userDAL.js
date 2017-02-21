import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'

const AUTHOR_ID = 'author._id'
const AUTHOR_NAME = 'author.name'
const DELETED_NAME = '[ DELETED ]'
const USER_DATA = 'id username name'
const SALT_ROUNDS = 10

export const getAll = async (limit, offset) => {
  return await UserSchema.find({}, USER_DATA, { lean: true }) 
    .sort({ 'date': -1 })
    .limit(limit)
    .skip(offset * limit)
}

export const getOne = async _id => {
  return await UserSchema.findOne({ _id }, USER_DATA, { lean: true })
}

// Hashing the password in the DAL?
export const create = async body => {
  const { password, username, name } = body
  await UserSchema.create({
    password,
    username,
    name
  })
}

export const update = async (_id, body) => {
  if (body.password) {
    const password = await hash(body.password, SALT_ROUNDS)
    body = Object.assign({}, body, {
      password
    })
  }

  await UserSchema.findOneAndUpdate({ _id }, body)

  if (body.username) {
    await PostSchema.update({ [AUTHOR_ID]: _id }, { [AUTHOR_NAME]: body.username }, { multi: true })
    await CommentSchema.update({ [AUTHOR_ID]: _id }, { [AUTHOR_NAME]: body.username }, { multi: true })
  }
}

export const deleteOne = async _id => {
    await UserSchema.findOneAndRemove({ _id })
    await PostSchema.remove({ [AUTHOR_ID]: _id })
    await CommentSchema.update({ [AUTHOR_ID]: _id }, { [AUTHOR_NAME]: DELETED_NAME }, { multi: true })
}