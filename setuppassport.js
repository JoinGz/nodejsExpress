//设置 Passport 对 User 模型的序列化和反序列化操作了。
//这样 Passport 就能实现 session 和 user 对象的互相转化了
/**
 * 
 * 在标准的 web 应用中，只有当客户端发送了登录请求才会需要对用户进行身份认证。
 * 如果认证通过的话，两者之间就会新建一个 session 并将其保存到 cookie 中进行维护。
 * 任何后续操作都不会再进行认证操作，取而代之的是使用 cookie 中唯一指定的 session 。
 * 所以，Passport 需要通过序列化和反序列化实现 session 和 user 对象的互相转化。
 * 
 */
var passport = require("passport");
// 使用本地验证,直接定义方法。还有OAuth验证。
var LocalStrategy = require("passport-local").Strategy;
// 实体数据库模块
var User = require("./models/user");
// setuppassport.js 验证代码
// LocalStrategy(这里的参数，就是你需要验证的)
// 本文就是login传过来的 username , password
passport.use("login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      // 当发生系统级异常时，返回done(err)，这里是数据库查询出错，一般用next(err)，但这里用done(err)，两者的效果相同，都是返回error信息；
        if(err) { return done(err); }
        if (!user) {
          // 当验证不通过时，返回done(null, false, message)，这里的message是可选的，可通过connect-flash调用；
            return done(null, false, { message: "No user has that username!" });
        }

        user.checkPassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
                // 当验证通过时，返回done(null, user)。
                return done(null, user);
            } else {
                return done(null, false, { message: "Invalid password." });
            }
        });
    });
}));
//参数 done 验证验证完成后的回调函数，由passport调用
//因为 User 对象都有一个 _id 属性作为唯一标识符，所以我们就根据它来进行 User 对象的序列化和反序列化操作
module.exports = function() {
// 序列化
// serializeUser 用户登录验证成功以后将会把用户的数据存储到 session 中
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
// 反序列化
// deserializeUser 每次请求的时将从 session 中读取用户对象，并将其封装到 req.user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
