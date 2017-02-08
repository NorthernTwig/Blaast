import Koa from 'koa'
import Router from 'koa-router'
import json from 'koa-json'
import db from './utils/mongo'
import main from './routes/main'
const app = new Koa()
const router = new Router()
const PORT = 3000

app.use(json())

router.use('/', main.routes())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

export default app