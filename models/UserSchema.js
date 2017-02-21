import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}).pre('save', async function(next) {
  try {
    this.password = await hash(this.password, 10)
    next()
  } catch(e) {
    return next(e)
  } 
}))

