import Router from 'koa-router'
import jwt from './middlewares/auth/jwt'
import webhookCheck from './middlewares/webhook/checkWebhook'
import updateWebhookCheck from './middlewares/webhook/updateWebhook'
import { webhooks as generateSelf, main as mainSelf } from './libs/generateSelf'
import pagination from './libs/pagination'
import * as webhook from '../DAL/webhook'

const router = Router()


router
  .get('webhooks', jwt, async (ctx) => {
    const limit = parseInt(ctx.query.limit, 1) || 10
    const offset = parseInt(ctx.query.offset, 1) || 0
    const { _id } = ctx.state.user
    const webhooks = await webhook.getAll(limit, offset, _id)
      .catch(() => ctx.throw('Could not find any webhooks owned by you', 404))
    const webhooksWithSelf = webhooks.map(webhook => generateSelf(webhook, ctx))

    ctx.body = pagination(webhooksWithSelf, ctx, limit, offset)
  })
  .get('webhooks/:_id', jwt, async (ctx) => {
    const webhookInfo = await webhook.getOne(ctx)
      .catch(() => ctx.throw('Could not find a webhook owned by you with that id', 404))

    ctx.body = generateSelf(webhookInfo, ctx)
  })
  .post('webhooks', webhookCheck, jwt, async (ctx) => {
    const newWebhook = await webhook.create(ctx)
      .catch(e => ctx.throw('Could not register webhook', e.status))
    const { _id: id } = newWebhook

    ctx.set('Location', `${ process.env.URL }/webhooks/${ id }`)
    ctx.status = 201
    ctx.body = {
      status: ctx.status,
      location: ctx.response.header.location,
      self: mainSelf(ctx),
    }
  })
  .patch('webhooks/:_id', updateWebhookCheck, jwt, async (ctx) => {
    const { scope } = ctx.request.body
    let body = ctx.request.body

    if (scope) {
      body = Object.assign({}, body, {
        scope: scope.trim().split(' '),
      })
    }

    const updatedWebhook = await webhook.update(ctx, body)
      .catch(e => ctx.throw('Could not update webhook with that id', e.status))

    if (updatedWebhook === null) {
      ctx.throw(403)
    }
    ctx.status = 204
  })
  .delete('webhooks/:_id', jwt, async (ctx) => {
    const deletedWebhook = await webhook.remove(ctx)
      .catch(e => ctx.throw('Could not delete webhook', e.status))

    if (deletedWebhook === null) {
      ctx.throw(403)
    }

    ctx.status = 204
  })

export default router
