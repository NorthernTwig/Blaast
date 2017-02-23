import UserSchema from '../models/UserSchema'

export const getUser = async username => await UserSchema.findOne({ username })
