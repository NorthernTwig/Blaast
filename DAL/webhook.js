import UserSchema from '../models/UserSchema'
import PostSchema from '../models/PostSchema'
import CommentSchema from '../models/CommentSchema'
import WebhookSchema from '../models/WebhookSchema'

const WEBHOOK_DATA = '_id ownerId endpoint scope'

export const getAll = async (limit, offset) => {
  const user = await UserSchema.findOne({ _id })

  if (!user) {
    ctx.throw(403)
  }

  return await WebhookSchema.find({ownerId: _id}, WEBHOOK_DATA, { lean: true })
    .sort({ 'date': -1 })
    .limit(limit)
    .skip(offset * limit)
}

export const getOne = async ctx => {
  const { _id } = ctx.params
  const ownerId = ctx.state.user._id
  const user = await UserSchema.findOne({ _id })

  if (!user) {
    ctx.throw(403)
  }

  return await WebhookSchema.findOne({ownerId, _id}, WEBHOOK_DATA, { lean: true })
}

export const create = async ctx => {
  const { _id } = ctx.state.user
  const { endpoint, scope, secret } = ctx.request.body
  const user = await UserSchema.findOne({ _id })

  if (!user) {
    ctx.throw(403)
  }

  await new WebhookSchema({
    ownerId: _id,
    endpoint,
    scope: scope.trim().split(' '),
    secret
  }).save()
}

export const update = async (ctx, body) => {
  const ownerId = ctx.state.user._id
  const { _id } = ctx.params
  const user = await UserSchema.findOne({ _id })

  if (!user) {
    ctx.throw(403)
  }

  return await WebhookSchema.findOneAndUpdate({_id, ownerId}, body)
}

export const remove = async ctx => {
  const { _id } = ctx.params
  const ownerId = ctx.state.user._id
  const user = await UserSchema.findOne({ _id })

  if (!user) {
    ctx.throw(403)
  }

  return await WebhookSchema.findOneAndRemove({_id, ownerId})
}