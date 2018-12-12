var express = require('express');
var router = express.Router();

var classifyApi = require('./classify_api');

//查询所有图标
router.get('/api/selectIcon', classifyApi.selectIcon);

//添加分类
router.post('/api/addClassify',classifyApi.addClassify);

//获取所有分类
router.get('/api/getClassify',classifyApi.getClassify);

module.exports = router;
