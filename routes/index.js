var express = require('express');
const multer = require('multer');
var router = express.Router();

const Articles = require('../models/ArticleModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'nihao' });
});


// // 自定义文件存储
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // 指定文件存储目录
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // 使用原始文件名
//   }
// });

// // 文件过滤器，用于解决中文文件名乱码问题
// const fileFilter = (req, file, callback) => {
//   // 将文件名从 latin1 编码转换为 utf8 编码
//   file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
//   callback(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// // 上传文章
// router.post('/articles', upload.single('files'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.send({ message: 'File uploaded successfully', filename: file.filename });
// });

module.exports = router;
