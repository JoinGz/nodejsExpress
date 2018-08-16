let express = require('express')
let User = require('./models/user')
let router = express.Router()
router.use((requset, response, next)=>{
  response.locals.currentUser = requset.user;
  response.locals.errors = requset.flash("error");
  response.locals.infos = requset.flash("info");
  next()
})
// console.log(User);
router.get('/',(request, response,next)=>{
  User.find().exec((err, users)=>{
    if(err){
      console.log(err);
      
      return next(err)
    }
    response.render('index2',{
      users:users
    })
  })
})
module.exports = router