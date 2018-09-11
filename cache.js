var path = require('path')
let express = require('express')
var app = express()
var static = path.resolve(__dirname, 'src/static')
// 经过static进来文件的貌似已经有了last Etag
app.use(express.static(static))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/img',(req, res)=>{
  res.render('cache')
})
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'))
})