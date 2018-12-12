var query = require('../../mysql');

var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

//查询图标列表
var selectIcon = function(req,res,next){
    query(sql.SELECT_ICON,function(error,results){
        if(error){
            res.json({code:0,msg:error});
        }else{
            res.json({code:1,data:results});
        }
    })
}

//添加分类
var addClassify = function(req,res,next){
    var params = req.body,
        uid = params.uid,
        c_name = params.c_name,
        c_icon = params.c_icon,
        type = params.type;
    if(!uid || !c_name || !c_icon || !type){
        res.json({code:4,msg:'缺少参数'});
    }else{
        isHasClassify();
    }  
    
    function isHasClassify(){
        query(sql.ISHAS_CLASSIFY,[uid,c_name,type],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                if(results.length){
                    res.json({code:3,msg:'此分类已存在'})
                }else{
                    addClassify();
                }
            }
        })
    }

    function addClassify(){
        var cid = uuid.v1();
        query(sql.ADD_CLASSIFY,[cid,c_icon,c_name,type,uid],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                res.json({code:1,msg:'添加成功'})
            }
        })
    }
}

var getClassify = function(req,res,next){
    var uid = req.query.uid;
    if(!uid){
        res.json({code:4,msg:'缺少参数'})
    }else{
        query(sql.SELECT_ALL_C,[uid],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                res.json({code:1,data:results})
            }
        })
    }
}

module.exports = {
    selectIcon:selectIcon,
    addClassify:addClassify,
    getClassify:getClassify
}