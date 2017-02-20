import Router from 'koa-router'
import WebhookSchema from '../models/WebhookSchema'
import jwt from './middlewares/jwt'
import webhookCheck from './middlewares/webhookCheck'
import { webhooks as generateSelf } from './libs/generateSelf'
import pagination from './libs/pagination'
const router = Router()

router
  .get('webhooks', jwt, async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const path = ctx.req._parsedUrl.pathname
    const { _id } = ctx.state.user

    try {
      const webhooks = await WebhookSchema.find({ownerId: _id}, '_id ownerId endpoint scope', { lean: true })
        .sort({ 'date': -1 })
        .limit(limit)
        .skip(offset * limit)

      const webhooksWithSelf = webhooks.map(webhook => generateSelf(webhook, ctx))
      ctx.body = pagination(webhooksWithSelf, ctx.url, limit, offset, path)
    } catch(e) {
      ctx.throw('Could not find any webhooks owned by you', 404)
    }
  })
  .get('webhooks/:_id', jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const ownerId = ctx.state.user._id

    try {
      const webhook = await WebhookSchema.findOne({ownerId, _id}, '_id ownerId endpoint scope', { lean: true })
      ctx.body = generateSelf(webhook, ctx)
    } catch(e) {
      ctx.throw('Could not find a webhook owned by you with that id', 404)
    }
  })
  .post('webhooks', webhookCheck, jwt, async (ctx, next) => {
    const { _id } = ctx.state.user
    const { endpoint, scope, secret } = ctx.request.body

    try {
      await WebhookSchema.create({
        ownerId: _id,
        endpoint,
        scope: scope.trim().split(' '),
        secret
      })
      ctx.status = 201
      ctx.body = 'Webhook successfully registered'
    } catch(e) {
      ctx.throw('Could not register webhook', 400)
    }
  })
  .patch('webhooks/:_id', jwt, async (ctx, next) => {
    const ownerId = ctx.state.user._id
    const { _id } = ctx.params
    const { scope } = ctx.request.body
    let body = ctx.request.body

    if (scope) {
      body = Object.assign({}, body, {
        scope: scope.trim().split(' ')
      })
    }

    try {
      const updatedWebhook = await WebhookSchema.findOneAndUpdate({_id, ownerId}, body)

      if (updatedWebhook === null) {
        await ctx.throw('You do not own this webhook', 403)
      }

      ctx.body = 'Webhook successfully updated'
    } catch(e) {
      ctx.throw('Could not update webhook with that id', 400)
    }
  })
  .delete('webhooks/:_id', jwt, async (ctx, next) => {
    const { _id } = ctx.params
    const ownerId = ctx.state.user._id

    try {
      const deletedWebhook = await WebhookSchema.findOneAndRemove({_id, ownerId})

      if (deletedWebhook === null) {
        ctx.throw('You do not own this post', 403)
      }

      ctx.status = 204
      ctx.body = 'Webhook was successfully deleted'
    } catch(e) {
      const message = e.message || 'Could not delete webhook'
      ctx.throw(message, 400)
    }

  })

  export default router