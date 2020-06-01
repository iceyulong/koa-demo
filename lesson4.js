import Koa from 'koa'
import Router from 'koa-router'
import mid1 from './middleware/mid1'
import mid2 from './middleware/mid2'
import mid3 from './middleware/mid3'

const app = new Koa()
const router = new Router()

/** 局部使用中间件 */
// router.get('/tag', mid1(), async ctx => {
//   ctx.body = 'hello kitty'
// })

// router.get('/list', mid1(), async ctx => {
//   ctx.body = [1, 2, 3]
// })

/** 全局使用中间件 */
router.get('/', async ctx => {
  ctx.body = 'hi'
})
/**
 * 洋葱模型
 * middleware1-start
 * middleware2-start
 * middleware3-start
 * middleware3-end
 * middleware2-end
 * middleware1-end
 */
app.use(mid1())
app.use(mid2())
app.use(mid3())

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
