var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
// body-parser 模块并用于后面请求参数的解析
var bodyParser = require('body-parser')
// cookie-parser 处理从浏览器中获取的cookies
var cookieParser = require('cookie-parser')
// express-session 用于处理用户 session
var session = require('express-session')
// connect-flash 则用户展示错误信息
var flash = require('connect-flash')

var routes = require('./routes')
var app = express()

// 连接到你MongoDB服务器的test数据库
mongoose.connect('mongodb://localhost:27017/test',(err)=>{
    if(err){
        console.log('链接数据库失败'+err);
    }
})
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
  })
)
app.use(flash())
app.use(routes)

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'))
})
