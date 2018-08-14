let http = require('http')
let express = require('express')
let app = express()
let path = require('path')
// 静态文件直接访问，不用加static.如在static/text.txt   http://localhost:3000/text.txt
var static = path.resolve(__dirname, 'static')
app.use(express.static(static))

app.get('/', (request, response) => {
  response.end('welcome to home')
})
// app.get('/static/*',(request, response)=>{
//   response.end('welcome to ')
// })
app.use(function(request, response) {
  // request.ip 获取请求IP ,可以制造黑名单
  response.statusCode = 404
  response.end('404')
  // 重定向
  // response.redirect("https://baidu.com");
  // response.sendFile("http://localhost:3000/static/test.txt")
})

http.createServer(app).listen(3000)
