let express = require('express')
let http = require('http')
let app = express()
// let logger = require('morgan')
// app.use(logger('short'))
app.use((request, response, next) => {
  let date = new Date().getMinutes()
  if (date % 2 === 0) {
    next()
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end('Not Found')
  }
})
app.use((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  response.end('OK,很强')
})
http.createServer(app).listen(3000)
