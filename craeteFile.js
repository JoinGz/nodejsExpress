let fs = require('fs')
// 打开文件，a+模式，不存在就创建。目录项要建好
// fs.open('./file/one.txt','a+',(err,fd)=>{
//   if(err){
//     console.log(err)
//   }
//   console.log('ok');
//   console.log(fd);
// })
// 异步读取文件
// 编码问题改变文件编码或者下载插件 iconv-lite
// fs.readFile('./file/one.txt',(err,data)=>{
//   if(err){
//     console.log(err); 
//   }
//   console.log(data.toString());
// })
// 写入文件;会覆盖之前的内容
// fs.writeFile('file/one.txt','789',(err)=>{
//   if(err)console.log(err);
//   fs.readFile('file/one.txt',(err,data)=>{
//     if(err)console.log(err);
//     console.log(data.toString());
//   })
// })
// 写入文件，不覆盖方式。用open打开在操作
fs.open('file/one.txt','a+',(err,fd)=>{
  if(err)console.log(err);
  fs.write(fd,'增加的内容',(err)=>{
    if(err)console.log(err);
    
  })
  
})
// 创建目录
// fs.mkdir('file/test',(err)=>{
//   if(err)console.log(err);
//   console.log('success');
// })
// 读取目录
// fs.readdir('file',(err,files)=>{
//   if(err)console.log(err);
//   console.log(files);
//   files.forEach(v=>{
//     console.log(v)
//   })
// })