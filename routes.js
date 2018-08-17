let express = require('express')
let User = require('./models/user')
var passport = require("passport");
let router = express.Router()
router.use((requset, response, next)=>{
  response.locals.currentUser = requset.user;
  // 传了errors,locals出去
  response.locals.errors = requset.flash("error");
  response.locals.infos = requset.flash("info");
  next()
})
router.get("/login", function(req, res) {
    res.render("login");
});
//在路由中加载passport作为中间件提供认证服务
//其中 passport.authenticate 函数会返回一个回调。该函数会根据我们的指定对不同的验证结果分别进行重定向。
//例如，登录成功会重定向到首页，而失败则会重定向到登录页。
// authenticate开始做验证(定义完了setuppassport)
// authenticate()方法有3个参数，第一是name，即验证策略的名称，第二个是options
// 第三个参数是callback。注意如果使用了callback，那么验证之后建立session和发出响应都应该由这个callback来做，passport中间件之后不应该再有其他中间件或callback
// 这里authenticate验证通过的就会产生res.user
router.post("/login", passport.authenticate("login", {
    // session:true,设置是否需要session，默认为true
    // 设置当验证成功时的跳转链接
    successRedirect: "/",
    // 设置当验证失败时的跳转链接
    failureRedirect: "/login",
    //设置为Boolean时，connect-flash将调用use()里设置的message。设置为String时将直接调用这里的信息。
    failureFlash: true 
    // successFlash：Boolean or String。使用方法同上。
}))
router.get("/users/:username", function(req, res, next) {
    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) { return next(err); }
        if (!user) { return next(404); }
        res.render("profile", { user: user });
    });
});
router.get('/',(request, response,next)=>{
  User.find({},{_id:0,password:0},{sort:{createdAt:-1}},(err, users)=>{
    if(err){
      console.log(err);
      return next(err)
    }
    response.render('index2',{
      users:users
    })
  })
})
router.get('/signup',(request, response)=>{
  response.render('signup')
})
router.post("/signup",(request, response,next)=>{
  let name = request.body.username
  let key = request.body.password
  User.findOne({username:name},{_id:0,password:0},(err,data)=>{
    if(err){
      return next(err)
    }
    if(data){
      // response.end('用户名已注册')
      request.flash("error", "User already exists");
      return response.redirect("/signup");
    }else{
      User.create({
        username:name,
        password:key
      },(err,data)=>{
        if(data){
          // response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
          // response.end('注册成功')
          next()
        }
      })
    }
  })

}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}))
// 登出部分
// 注意下面的代码里有个req.logout()，它不是http模块原生的方法，也不是express中的方法，
// 而是passport加上的，passport扩展了HTTP request，添加了四种方法。
// logIn(user, options, callback)：用login()也可以。作用是为登录用户初始化session。options可设置session为false，即不初始化session，默认为true。
// logOut()：别名为logout()。作用是登出用户，删除该用户session。不带参数。
// isAuthenticated()：不带参数。作用是测试该用户是否存在于session中（即是否已登录）。若存在返回true。
// isUnauthenticated()：不带参数。和上面的作用相反。
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
// 该中间件函数会对当前用户的权限进行检查，如果检查不通过则会重定向到登录页
function ensureAuthenticated(req, res, next) {
    // 一个Passport提供的函数
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}
//  GET /edit（在router.js中）
// 确保用户被身份认证；如果它们没有被重定向的话则运行你的请求处理
router.get("/edit", ensureAuthenticated, function(req, res) {
    res.render("edit");
});
// 通常，这会是一个PUT请求，不过HTML表单仅仅支持GET和POST
router.post("/edit", ensureAuthenticated, function(req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/");
    });
});
module.exports = router