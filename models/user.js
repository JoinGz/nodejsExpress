let mongoose = require('mongoose')
//给密码加密
let bcrypt = require("bcrypt-nodejs");
let SALT_FACTOR = 10;
// 定义数据库类型(模型骨架，表结构)
let userSchema = mongoose.Schema({
  username:{type:String,require:true,unique:true},
  password:{type:String,require:true},
  createdAt:{type:Date, default: Date.now},
  displayName:String,
  bio: String
})
// 增加公共方法
userSchema.methods.name = function() {
    return this.displayName || this.username;
}

var noop = function() {};
// 保存操作之前的回调函数,使用save方法保存数据
userSchema.pre("save", function(done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { 
            return done(err); 
        }

        bcrypt.hash(user.password, salt, noop, 
            function(err, hashedPassword) {
                if (err) {
                    return done(err); 
                }
                user.password = hashedPassword;
                done();
            }
        );
    });
});
// 验证密码操作，使用的是 bcrypt.compare 函数而不是简单的相等判断 ===
userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
}
// 创建model,User数据库中的集合名称, 不存在会创建.上面是定义这里是生成
var User = mongoose.model("User", userSchema);
module.exports = User;