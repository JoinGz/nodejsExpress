let express = require('express')
let app = express()
var session = require('express-session')
let path = require('path')
var static = path.resolve(__dirname, 'src/static')
let arr = []
let id = 1
app.use(
  session({
    //我们使用一串随机字符串来对客户端的 session 进行编码。这样就能在一定程度上增加 cookies 的安全性。
    //而将 resave 设置为 true 则保证了即使 session 没有被修改也依然会被刷新。
    secret: '1',
    resave: true,
    saveUninitialized: true
  })
)
app.use((request, res,next)=>{
  var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
  if (arr.toString().indexOf(ip) === -1) {
    arr.push(ip)
  }
  if(!request.session.name){
    request.session.name = arr.length
  }
  if(!request.session.plus){
    request.session.plus = 0
  }
  next()
})
app.use(express.static(static))

app.use('/a', (request, respones) => {
  respones.json(request.session)
})
app.get('/go', (request, respones) => {

  let data = {}
  data.online = arr.length;
  data.name = request.session.name
  data.plus = request.session.plus
  respones.json(data)
})
app.post('/plus', (request, respones) => {
  
  request.session.plus++
  
  console.log(request.session.plus);
  
  respones.end('ok')
})
app.use((request, respones) => {
  var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
  if (arr.toString().indexOf(ip) === -1) {
    arr.push(ip)
  }
  let num = arr.length.toString()
  respones.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8'
  })
  respones.end('当前在线人数' + num )
})
app.listen(3000, () => {
  console.log('ok');

})

