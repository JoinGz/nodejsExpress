let express = require('express')
let app = new express()
var path = require("path")
var bodyParser = require('body-parser')
// 使用multer插件
// Multer在解析完请求体后，会向Request对象中添加一个body对象和一个file或files对象（上传多个文件时使用files对象 ）
var multer = require('multer')
// 设置multer配置项
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './views') // 保存的路径，备注：需要先有;或者fs动态创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳 +上传前的本地名字(这里偷懒了，应该取出后缀名即可)
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
})
// 限制上传文件类型
let fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true); //允许
  } else {
    // 在post的函数里面拦截
    req.err = '失败';
    cb(null, false);
  }
}
// 实例化multer;并且传入配置项
// var upload = multer({ dest: './views' })
var upload = multer({
  storage,
  limits: {
    fileSize: 1000 * 1024 // 1mb
  },
  fileFilter
})
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 跨域访问
  // res.header("Access-Control-Allow-Headers", "X-Requested-With"); 跨域允许包含的头。
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");跨域允许包含的方式。
  // res.header("X-Powered-By", ' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}))
var publicPath = path.resolve(__dirname, "");
app.use(express.static(publicPath));
// upload.single('name') 表示单个文件 name = 你html定义的这个文件的键
/**
 * upload.array(fieldname[, maxCount]) - 多个文件上传
 * upload.array('files', 3) html那边就是 fd.append('files', files[i])乘3次
 接收名为fieldname的，多个上传文件数组。可选参数maxCount表示可接受的文件数量，上传文件数超出该参数指定的数据后会抛出一个错误。文件数组会被保存在req.files中
 .fields(fields) - 多个文件上传
接收通过fields指定的多个上传文件。文件数组对象会被保存在req.files中。
fields是一个包含对象的数组，对象中会包含name和maxCount两个属性：
[{ name: 'avatar', maxCount: 1 },
{ name: 'gallery', maxCount: 8 }]
.none() - 仅解析文本字段
仅解析文本字段。如果请求中有任何上传文件，会触发'LIMIT_UNEXPECTED_FILE'错误。这个方法与upload.fields([])类似。
.any() - 接收所有文件
接收请求中的所有文件。上传文件数组会被保存在req.files中。
 */
app.post('/up', upload.single('file'), function (req, res, next) {
  // console.log(req.files)
  console.log(req.file)
  console.log(req.body)
  // 在这里拦截文件限制的错误
  console.log(req.err);
  res.end('op')
})
// 捕获错误
app.use(function (err, req, res, next) {
  // if (err.code === 'LIMIT_FILE_SIZE') {
  //   res.send({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
  //   return 
  // }
  // console.log(err);
  // console.log(req.err);
  // 应该还是要判断下错误代码
  if (err.code === 'LIMIT_FILE_SIZE') {
    console.log('文件太大');
  }
  // Handle any other errors
})

app.listen(3000, () => {
  console.log('begin')
})