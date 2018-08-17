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
// 权限认证
var passport = require("passport");
var setUpPassport = require("./setuppassport");
var routes = require('./routes')
var app = express()

// 连接到你MongoDB服务器的test数据库,并使用新的解析器
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true},(err)=>{
    if(err){
        console.log('链接数据库失败'+err);
    }
})
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// 默认为{ extended: true } 使用qs库解析URL编码的数据。否则使用querystring库
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// 使服务器支持session
app.use(
  session({
    //我们使用一串随机字符串来对客户端的 session 进行编码。这样就能在一定程度上增加 cookies 的安全性。
    //而将 resave 设置为 true 则保证了即使 session 没有被修改也依然会被刷新。
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
  })
)
// 初始化调用 passport
app.use(passport.initialize());
app.use(passport.session());
setUpPassport();
app.use(flash())
app.use(routes)
app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'))
})
