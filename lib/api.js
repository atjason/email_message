
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const config = require('../config')
const server = require('./server')

const app = new Koa()

async function processor(ctx, next) {
  try {
    console.log(ctx.method, ctx.path)
    await next()

  } catch (e) {
    ctx.status = e.status || 500
    ctx.type = 'json'

    const error = e.message || JSON.stringify(e)
    console.error(error)
    ctx.body = { error }

    ctx.throw(ctx.status, { error })
    // ctx.app.emit('error', e, ctx)
  }
}

function start () {

  app.use(koaBody())
  app.use(processor)

  router.get('/',  server.sendMail)
  router.post('/', server.sendMail)
  app.use(router.routes())
  
  const host = '127.0.0.1'
  const port = config.port || 2018
  app.listen(port, host)
  console.log(`Server listening on ${host}:${port}`)
}

module.exports = { start }
