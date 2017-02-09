import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('UserSchema', mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    default: '123',
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))