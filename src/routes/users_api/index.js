var query = require('../../mysql');
var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

//添加用户
var addUser = function(req,res,next){
   var uid = uuid.v1();  //基于时间戳生成唯一标识
   var nick_name = req.body.nick_name || null;
   query(sql.ADD_USER,[uid,nick_name],function(error,results){
        if(error){
            res.json({code:0,msg:error})
        }else{
            res.json({code:1,msg:'添加成功',uid:uid})
        }
   })
}

module.exports = {
    addUser:addUser
}