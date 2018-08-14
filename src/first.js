let http = require('http')
let myRequest = (request,response)=>{
	response.end('hellow world')
}
let server = http.createServer(myRequest)
server.listen(3000)