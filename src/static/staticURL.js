let http = require('http')
let express = require('express')
let app = express()
let path = require('path')

let images = path.resolve(__dirname,'./images')
let pathHtml = path.resolve(__dirname, './html')
// 注意 /
app.use('/images',express.static(images))
app.use('/html',express.static(pathHtml))
app.use('/get/:num/:num2',(request, response)=>{
  let num = request.params.num
  let num2 = request.params.num2
  let num3 = num + num2
  response.json({'num':num3})
})
app.use((requset, response)=>{
  response.end('ok')
})
http.createServer(app).listen(3000)