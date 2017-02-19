import { EventEmitter } from 'events'
import rp from 'request-promise'
import userSchema from '../../models/UserSchema'

// TODO: Revamp this - DRY
// TODO: Ping(?) 

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
    const users = await userSchema.find({}, 'webhook', { lean: true })
    const eventSubscribers = users.filter(user => user.webhook.scope.includes(emit) || user.webhook.scope.includes('push'))

    eventSubscribers.forEach(subscriber => {
      rp({
        uri: subscriber.webhook.endpoint,
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: data,
        json: true
      })
      .catch((e) => console.log(e))
    })
      
  } catch(e) {
    return
  }
}

export default emitter