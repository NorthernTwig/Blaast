import Koa from 'koa'
import Router from 'koa-router'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import db from './utils/mongo'
import entry from './routes/entry'
import user from './routes/user'
import post from './routes/post'
import error from './routes/error'
const app = new Koa()
const router = new Router()
const PORT = 3000

app.use(cors())
app.use(bodyParser())
app.use(json())

router.use(post.routes())
router.use(user.routes())
router.use(entry.routes())
router.use(error.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

export default app