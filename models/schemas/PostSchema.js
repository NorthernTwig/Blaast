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
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}))