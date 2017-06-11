import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('WebhookSchema', mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'UserSchema',
    required: true,
  },
  endpoint: {
    type: String,
  },
  scope: {
    type: Array,
    default: ['push'],
  },
  secret: {
    type: String,
  },
}))
