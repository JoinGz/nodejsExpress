let mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27017/test');
//创建一个表的样子，只有schema中有的属性才能被保存到数据库中
let UserSchema = mongoose.Schema({
  name:{type:String},
  age:{type:Number}
})
// 所有操作根据和数据库绑定的返回对象来操作(Model)
let User = mongoose.model("User2",UserSchema);
// 新增加一个实例
// let saveUser = new User({
//   name:'tl',
//   age:22
// })
// 实例(Entity)自我保存
// saveUser.save(()=>{
//   console.log('success')
// })
// 或是model保存,Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性
User.create({name:'ttxt',age:20,like:'read book'},(err,data)=>{
  if(!err){
    console.log(data)
  }
})
// 查找所有
// User.find({},(err,data)=>{
//   console.log(data)
// })
// 删除 符合条件的全部删除了
// User.remove({name:'tl'},(err,data)=>{
//   console.log(data);
// })
// 修改,更新
/*
* 参数1 匹配要更新的对象，$set更新器 指定要更新的字段。参数3不加就更新一条。
*/
// User.update({name:'tl'},{$set:{age:18}},{multi:true},(err)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log('success update')
//   }
// })
// 游标操作
//现在要分页查询，每页3条，查询第2页
//skip 跳过的条数 limit 限制返回的条数 sort排序 1升序 -1 降序 执行的时候会先排序再skip，再limit
/*
* find()这个函数中，obj.find(查询条件，field，callback)
* field中把需要显示的属性设置为大于零的数则返回该属性，
* _id不指定默认返回，设置_id为0则不返回该属性,
* 其他字段不指定，默认不返回
*/
// 这个就是不返回id,返回名字。名字降序(从大到下，Z-A)，age升序(从小到大)
// User.find({},{_id:0,name:1},{limit:3,skip:0,sort:{age:1,name:-1}},function(err,docs){
//   console.log(docs);
// }); //  [{ name: 'tl' }, { name: 'ttxt' }, { name: 'gz' } ]
//当找到第一条匹配的记录时就立刻返回，不再继续查找了，返回单个对象
// User.findOne({name:/^\w+9$/},{name:1, age:1, _id:0},function(err,doc){
//   console.log(doc);
// })
//按照ID进行查询
// User.findById('56ee117356acb568054dd6d4',{name:1, age:1, _id:0},function(err,doc){
//   console.log(doc);
// })
// 使用$gt(>)、$lt(<)、$lte(<=)、$gte(>=)、$ne(不等于)、$in(包含)、$or(或者)、$exists(是否存在)操作符进行排除性的查询
//创建模型，可以用它来操作数据库中的person集合，指的是整体
// User.find({'age':{"$gt":6}},{name:1, age:1, _id:0},function(err,docs){
// //查询age>6的数据
//     console.log(docs);
// })
// User.find({'age':{"$gt":6,"$lt":9}},{name:1, age:1, _id:0},function(err,docs){
// //查询6<age<9的数据
//     console.log(docs);
// })
// User.find({"name":{"$ne":"zf"},'age':{"$gt":6,"$lt":9}},{name:1, age:1, _id:0},function(err,docs){
// //查询name!='zf'&&6<age<9的数据
//     console.log(docs);
// })
// User.find({"name":{"$in":"zf"}},{name:1, age:1, _id:0},function(err,docs){
// //查询name=='zf'的所有数据
//     console.log(docs);
// })
// User.find({"age":{"$in":[6,7]}},{name:1, age:1, _id:0},function(err,docs){
// //查询age==6或7的所有数据
//     console.log(docs);
// })
// User.find({ age:{ $in: 6}},function(error,docs){
//     //查询age等于6的所有数据
//     console.log(docs);
// });


// User.find({ age:{$in:[6,10000]}},function(error,docs){
//     //可以把多个值组织成一个数组
//     console.log(docs);
// });

// User.find({"$or":[{"name":"gz"},{"age":18}]},function(error,docs){
//     //查询name为gz或age为18的全部文档
//     console.log(docs);
// });
// var start = new Date();
// var end = new Date();

// User.find({time:{$lt:end},time:{$gt:start}},function(error,docs){
//     //查询name为zfpx或age为6的全部文档
//     console.log(docs);
// });