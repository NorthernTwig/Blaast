import { EventEmitter } from 'events'
import rp from 'request-promise'
import WebhookSchema from '../../models/WebhookSchema'

const emitter = new EventEmitter()

emitter.on('post', data => {
  sendToSubscribers('post', data)
})

emitter.on('comment', data => {
  sendToSubscribers('comment', data)
})

emitter.on('user', data => {
  sendToSubscribers('user', data)
})

const sendToSubscribers = async (emit, data) => {
  try {
    const webhooks = await WebhookSchema.find({}, 'endpoint scope', { lean: true })
    const eventSubscribers = webhooks.filter(webhook => webhook.scope.includes(emit) || webhook.scope.includes('push'))
    await eventSubscribers.forEach(async subscriber => {
      await rp({
        uri: subscriber.endpoint,
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: data,
        json: true
      })
    })
      
  } catch(e) {
    console.log('Could not post hook')
  }
}

export default emitter