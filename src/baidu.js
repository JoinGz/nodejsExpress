var http = require('http')
// 安装一个插件
var request = require('request');
let x 
request('http://www.baidu.com', function (error, response, body) {
  console.log(error);
  
  if (!error && response.statusCode == 200) {
    // console.log(body) // 打印google首页
    x = body
    console.log(typeof x)
  }else{
    console.log(1);
    
  }
})

// var options = {
//   hostname: 'cv.qiaobutang.com',
//   port: 80,
//   path: '/',
//   method: 'GET'
// }

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   // console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8')
//   // res.on('data', function(chunk) {
//   //   console.log('BODY: ' + chunk)
//   // })
//   res.on('end', () => {
//     console.log('响应中已无数据。')
//   })
// })

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message)
// })

// req.end()

let app = (request, response)=>{
  let reg = /\u767e\u5ea6\u4e00\u4e0b/g
  let u = x.replace(reg,'百度两下')
  response.end(u)
}
let server = http.createServer(app)
server.listen(3000)
