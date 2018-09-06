var http = require('http'),fs = require('fs');
let express = require('express')
let app = express()
let path = require('path')
var static = path.resolve(__dirname, 'src/static')
app.use(express.static(static))
http.get('http://127.0.0.1:3000/a.jpg',function(req,res){  //path为网络图片地址
  var imgData = '';
  req.setEncoding('binary');
  req.on('data',function(chunk){
    imgData += chunk
    // console.log(imgData);
  })
  req.on('end',function(){
    fs.writeFile('file/1.jpg',imgData,'binary',function(err){  //path为本地路径例如public/logo.png
      if(err){console.log('保存出错！')}else{
        console.log('保存成功!')
      }
    })
  })
})
app.listen(3000, () => {
  console.log('ok');
})
// var http = require("http");
// var fs = require("fs");
// var server = http.createServer(function(req, res){}).listen(3000);
// console.log("http start");
// var url = "http://s0.hao123img.com/res/img/logo/logonew.png";
// http.get(url, function(res){
//     var imgData = "";
//     res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
//     res.on("data", function(chunk){
//         imgData+=chunk;
//     });
//     res.on("end", function(){
//         fs.writeFile("./file/logonew.png", imgData, "binary", function(err){
//             if(err){
//                 console.log("down fail");
//             }
//             console.log("down success");
//         });
//     });
// });