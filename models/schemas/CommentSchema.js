import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('CommentSchema', mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'PostSchema',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))