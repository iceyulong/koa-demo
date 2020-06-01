import Koa from 'koa'
import Router from 'koa-router'
const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = 'hello world'
})
router.get('/list', async ctx => {
  ctx.body = [1, 2, 3]
})
router.post('/', async ctx => {
  ctx.body = 'hello kitty'
})
router.post('/list', async ctx => {
  ctx.body = {
    name: [3, 2, 1]
  }
})

/** 动态路由 */
router.get('/list/:name', async ctx => {
  ctx.body = {
    name: ctx.params.name,
    time: Date.now()
  }
})
router.post('/list/:name', async ctx => {
  ctx.body = {
    name: ctx
  }
})

/** 分组路由 localhost:3000/group/sex */
const group = new Router({
  prefix: '/group'
})
group.get('/sex', async ctx => {
  ctx.body = 'male'
})
group.get('/age', async ctx => {
  ctx.body = 20
})

/** 嵌套路由 localhost:3000/outer/inner/list/1001 */
const sub = new Router({
  prefix: '/inner'
})
sub.get('/list/:uid', async ctx => {
  ctx.body = {
    uid: ctx.params.uid
  }
})
const nest = new Router()
nest.use('/outer', sub.routes())

/** 一个路由对应多个中间件 */
const db = new Router()
db.get('/db/:id', async (ctx, next) => {
  ctx.user = {
    name: 'tom',
    id: ctx.params.id
  }
  next()
}, async (ctx, next) => {
  ctx.log = 'log'
  next()
}, async ctx => {
  ctx.body = {
    user: ctx.user,
    log: ctx.log
  }
})

/** 重定向 */
const proxy = new Router()
proxy.post('/find', async ctx => {
  ctx.redirect('/list')
})
/** allowedMethods 处理option请求跨域，返回访问请求methods是GET或POST */
app.use(proxy.routes()).use(proxy.allowedMethods())
app.use(db.routes()).use(db.allowedMethods())
app.use(nest.routes()).use(nest.allowedMethods())
app.use(group.routes()).use(group.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = ctx
//   ctx.body = 'hello world'
})

app.listen(3000)
