/*
 * @Author: 李晓丹 
 * @Date: 2018-12-07 14:09:50 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-12-07 14:17:34
 */

var mysql = require('mysql');

var config = {
    user:'root',
    password:'root',
    database:'1609A-lemon',
    port:3306,
    host:'localhost',
    connectionLimit:100
}

var pool = mysql.createPool(config);

/**
 * 连接数据库，进行mysql查询
 * @param {string} sql  sql语句
 * @param {array} query 查询参数
 * @param {funciton} fn 回调函数
 */

/*
    select * from userlist where uid=?

    select * from userlist
*/  
module.exports = function(sql,query,fn){
    fn = fn ? fn : query;
    query = query || [];

    pool.getConnection(function(error,con){
        if(error){
            fn(error)
        }else{
            con.query(sql,query,function(err,results){
                queryCallback(err,results);
                con.release();
            })
        }
    })

    function queryCallback(error,results){
        if(error){
            fn(error);
        }else{
            fn(null,results);
        }
    }

}