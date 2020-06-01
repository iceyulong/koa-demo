import Koa from 'koa'
import Router from 'koa-router'
// import bodyParser from 'koa-bodyparser'
import body from 'koa-better-body'

const app = new Koa()
const router = new Router()

/** koa-bodyparser */
// app.use(bodyParser())

// router.get('/form', async ctx => {
//   ctx.body = ctx.query
// })
// router.post('/form', async ctx => {
//   ctx.body = ctx.request.body
// })

/** koa-better-body */

app.use(body())

router.get('/form', async ctx => {
  ctx.body = ctx.query
})
router.post('/form', async ctx => {
  ctx.body = ctx.request.fields
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
