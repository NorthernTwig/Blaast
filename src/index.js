import Koa from 'koa'
import Router from 'koa-router'
import main from './routes/main'
const app = new Koa()
const router = new Router()
const PORT = 3000

router.use('/', main.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})