import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
  webhook: {
    endpoint: {
      type: String
    },
    scope: {
      type: Array,
      default: ['push']
    }
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))