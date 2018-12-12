var query = require('../../mysql');

var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

var addBill = function(req,res,next){
    // lid,uid,cid,timer,type,money

    var params = req.body,
        uid = params.uid,
        cid = params.cid,
        timer = params.timer,
        money = params.money;

    if(!uid || !cid || !timer || !money){
        res.json({code:4,msg:'缺少参数'})
    }else{
        var lid = uuid.v1();
        query(sql.ADD_BILL,[lid,uid,cid,timer,money],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                res.json({code:1,msg:"添加成功"})
            }
        })
    }
}

var getBill = function(req,res,next){
    var timer = req.query.timer,
        uid = req.query.uid,
        time_type = req.query.time_type;  // 1:年  2018 2017  2：月 2018-11 2018-12
    var classify = req.query.classify || ''; //['购物','餐饮',....]  string
    
    var classifyArr = [];
    if(!timer || !uid){
        res.json({code:4,msg:'丢失参数'})
    }else{
        var sqlStr;
        if(classify){
            classify = JSON.parse(classify);
            classify.forEach(function(item){
                classifyArr.push(decodeURI(item));
            })
            sqlStr = time_type == 1 ? sql.SELECT_YEAR_CBILL : sql.SELECT_MONTH_CBILL;
        }else{
            sqlStr = time_type == 1 ? sql.SELECT_YEAR_BILL : sql.SELECT_MONTH_BILL;
        }
        
        query(sqlStr,[uid,timer,classifyArr],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                res.json({code:1,data:results})
            }
        })
    }
}

var delBill = function(req,res,next){
    var lid = req.query.lid;

    if(!lid){
        res.json({code:4,msg:'缺少参数'})
    }else{
        query(sql.DELECT_BILL,[lid],function(error,results){
            if(error){
                res.json({code:0,msg:error})
            }else{
                res.json({code:1,msg:"删除成功"})
            }
        })
    }
}

module.exports = {
    addBill:addBill,
    getBill:getBill,
    delBill:delBill
}