const Koa = require('koa')
const app = new Koa()
const http = require("http").Server( app.callback() )
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public', { maxAge: 1000 * 3600 }))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

const store = require("./core/store")
const listenIO = require("./core/io")
const IO = require("socket.io")( http, {
  pingTimeout: 1000 * 10,
  pingInterval: 1000 * 2.5
} )

var myStore = new store()

listenIO( IO, myStore )

http.listen( 7788, () => {
  console.log( "服务器启动----" )
})

