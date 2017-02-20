import Router from 'koa-router'
import WebhookSchema from '../models/WebhookSchema'
const router = Router()

router
  .get('webhook', jwt, async (ctx, next) => {
    const { _id } = ctx.state.user

    try {
      const webhook = await WebhookSchema.find({ownerId: _id})
      ctx.body = webhook
    } catch(e) {
      ctx.throw('Could not find any webhooks owned by you', 404)
    }
  })
  .post('webhook', webhookCheck, jwt, async (ctx, next) => {

    const { _id } = ctx.state.user
    const { endpoint, scope } = ctx.request.body

    const webhook = {
      endpoint,
      scope: scope.trim().split(' ')
    }

    try {
      const userWithWebhook = await userSchema.findOneAndUpdate({ _id }, { webhook })
      ctx.status = 200
      ctx.body = 'Webhook successfully registered'
    } catch(e) {
      ctx.throw('Could not register webhook', 400)
    }
  })