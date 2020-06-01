/** 中间件，必须是一个函数，返回的必须是一个异步的函数，内部必须要有next()执行下一个中间件 */
export default () => {
  return async (ctx, next) => {
    console.log('middleware1-start')
    await next()
    console.log('middleware1-end')
  }
}
