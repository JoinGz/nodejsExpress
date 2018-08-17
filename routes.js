let express = require('express')
let User = require('./models/user')
var passport = require("passport");
let router = express.Router()
router.use((requset, response, next)=>{
  response.locals.currentUser = requset.user;
  response.locals.errors = requset.flash("error");
  response.locals.infos = requset.flash("info");
  next()
})
router.get("/login", function(req, res) {
    res.render("login");
});
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
module.exports = router