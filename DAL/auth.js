import UserSchema from '../models/UserSchema'

export const getUser = async (username) => {
  return await UserSchema.findOne({ username })
}
