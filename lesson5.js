import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa-cors'
import fs from 'fs'

const app = new Koa()
const router = new Router()

router.get('/getData', async ctx => {
  await cors()
  ctx.body = JSON.parse(fs.readFileSync('./static/data.json'))
  // ctx.body = 'hello wotld'
})

app.use(router.routes()).use(router.allowedMethods())
let port = 3000
app.listen(port,()=>{
  console.log('server start on port:'+port);
})
