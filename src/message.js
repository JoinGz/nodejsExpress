let express = require('express')
let path = require('path')
let http = require('http')
let app = express()
let logger = require('morgan')
let bodyParser = require("body-parser");
// 告诉 Express 你的视图存在于一个名为 views 的文件夹中
app.set("views", path.resolve(__dirname, "../views"));

// 告诉 Express 你将使用EJS模板引擎
app.set("view engine", "ejs");

// 日志记录
app.use(logger('dev'))
// 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里
app.use(bodyParser.urlencoded({
  extended: false
}));
// 设置留言的全局变量
let entries = [];
app.locals.entries = entries;

let static = path.resolve(__dirname, 'static')
app.use(express.static(static))

app.get('/', (request, response) => {
  // response.render("index", {
  //   entries: []
  // });
  response.render('index')
})
app.get('/newentry', (request, response) => {
  response.render('newentry');
})
app.post('/newentry', (request, response) => {
  if (!request.body.title || !request.body.body) {
    response.status(400).send('check table')
    return;
  }
  entries.push({
    title: request.body.title,
    body: request.body.body,
    published: (new Date()).toLocaleString()
  })
  response.redirect('/')
})
app.use((request, response) => {
  response.redirect('404.html')
})

http.createServer(app).listen(3000)