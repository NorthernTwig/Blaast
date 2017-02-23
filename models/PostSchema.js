import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('PostSchema', mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true
    },
    name: {
      type: String,
      ref: 'UserSchema',
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))