var express = require('express');
const multer = require('multer');
var router = express.Router();

const Articles = require('../models/ArticleModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'nihao' });
});

module.exports = router;
