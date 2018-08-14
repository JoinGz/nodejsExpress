let express = require('express')
let path = require('path')
let http = require('http')
let app = express()
// 告诉 Express 你的视图存在于一个名为 views 的文件夹中
app.set("views", path.resolve(__dirname, "../views"));

// 告诉 Express 你将使用EJS模板引擎
app.set("view engine", "ejs");

let static = path.resolve(__dirname, 'static')
app.use(express.static(static))

app.get('/',(request, response)=>{
  response.render("index", {
        message: "Hey everyone! This is my webpage."
    });
})

app.use((request, response)=>{
  response.redirect('404.html')
})

http.createServer(app).listen(3000)