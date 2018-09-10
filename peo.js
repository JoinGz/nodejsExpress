let express = require('express')
let app = express()
let session = require('express-session')
app.use(session({
  secret: 'Gz',
  saveUninitialized: true,
  resave:false
}))
app.use('/',(request, response)=>{
  console.log(request.session.id)
  response.json(request.session)
  
})
app.listen(3000,function () {
  console.log('Come on! Baby!')
})