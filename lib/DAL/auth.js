import UserSchema from '../models/UserSchema'

export const getUser = async username => UserSchema.findOne({ username })
