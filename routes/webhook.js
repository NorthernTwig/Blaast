import Router from 'koa-router'
import WebhookSchema from '../models/WebhookSchema'
import jwt from './middlewares/auth/jwt'
import webhookCheck from './middlewares/webhook/checkWebhook'
import { webhooks as generateSelf } from './libs/generateSelf'
import pagination from './libs/pagination'
import baseUrl from './libs/baseUrl'
import * as webhook from '../DAL/webhook'
const router = Router()


router
  .get('webhooks', jwt, async (ctx, next) => {
    const limit = parseInt(ctx.query.limit) || 10
    const offset = parseInt(ctx.query.offset) || 0
    const { _id } = ctx.state.user

    try {
      const webhooks = await webhook.getAll(limit, offset, _id)

      const webhooksWithSelf = webhooks.map(webhook => generateSelf(webhook, ctx))
      ctx.body = pagination(webhooksWithSelf, ctx, limit, offset)
    } catch(e) {
      ctx.throw('Could not find any webhooks owned by you', 404)
    }
  })
  .get('webhooks/:_id', jwt, async (ctx, next) => {
    try {
      const webhookInfo = await webhook.getOne(ctx)
      ctx.body = generateSelf(webhookInfo, ctx)
    } catch(e) {
      ctx.throw('Could not find a webhook owned by you with that id', 404)
    }
  })
  .post('webhooks', webhookCheck, jwt, async (ctx, next) => {
    try {
      const newWebhook = await webhook.create(ctx)

      ctx.set('Location', `${ baseUrl }/webhooks/${newWebhook._id}` )
      ctx.status = 201
      ctx.body = 'Webhook successfully registered'
    } catch(e) {
      ctx.throw('Could not register webhook', 400)
    }
  })
  .patch('webhooks/:_id', jwt, async (ctx, next) => {
    const { scope } = ctx.request.body
    let body = ctx.request.body

    if (scope) {
      body = Object.assign({}, body, {
        scope: scope.trim().split(' ')
      })
    }

    try {
      const updatedWebhook = await webhook.update(ctx, body)

      if (updatedWebhook === null) {
        ctx.throw(403)
      }

      ctx.body = 'Webhook successfully updated'
    } catch(e) {
      ctx.throw('Could not update webhook with that id', e.status)
    }
  })
  .delete('webhooks/:_id', jwt, async (ctx, next) => {
    try {
      const deletedWebhook = await webhook.remove(ctx)

      if (deletedWebhook === null) {
        ctx.throw(403)
      }

      ctx.status = 204
    } catch(e) {
      ctx.throw('Could not delete webhook', e.status)
    }

  })

  export default router