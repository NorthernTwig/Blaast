import mongoose from 'mongoose'
import { hash } from 'bcrypt-as-promised'

export default mongoose.model('UserSchema', mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
})
.pre('findOneAndUpdate', async function(next) {
  try {
    if (this._update.password) {
      this._update.password = await hash(this._update.password, 10)
    }
    next()
  } catch(e) {
    return next(e)
  } 
})
.pre('save', async function(next) {
  try {
    if (this.password) {
      this.password = await hash(this.password, 10)
    }
    next()
  } catch(e) {
    return next(e)
  } 
}))
