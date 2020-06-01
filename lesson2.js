import Koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import source from 'koa-static'

const app = new Koa()
const router = new Router()
/** 使用多个模板 */

app.use(views('./views', {
  map: {
    ejs: 'ejs',
    html: 'underscore'
  }
}))

/** 使用单个模板 */
/*
app.use(views('./views'), {
  map: {
    extension: 'ejs'
  }
})
*/
app.use(source('./static'))
router.get('/ejs', async ctx => {
  // 异步任务，需要await
  await ctx.render('./index.ejs', {
    user: {
      name: '赵云'
    }
  })
})
router.get('/underscore', async ctx => {
  await ctx.render('./index.html', {
    list: [11, 22, 33],
    message: 'hello kitty'
  })
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
