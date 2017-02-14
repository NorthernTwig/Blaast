import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: '123',
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
}))