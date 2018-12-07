var query = require('../../mysql');
var sql = require('../../mysql/sql');

var selectUser = function(req,res,next){
    query(sql.SELECT_ALL,function(error,results){
        if(error){
            res.json({code:0,error})
        }else{
            res.json({code:1,data:results})
        }
    })
}

module.exports = {
    selectUser:selectUser
}