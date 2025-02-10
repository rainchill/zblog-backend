var express = require('express');
var router = express.Router();

// router.post('/', (req, res) => {
//     const { username, password } = req.body;
//     // 这里可以添加实际的用户验证逻辑
//     if (username === 'admin' && password === '123456') {
//         // 假设验证成功，返回一个 token
//         const token = 'secret-token';
//         res.json({ success: true, token });
//     } else {
//         res.status(401).json({ success: false, message: '用户名或密码错误' });
//     }
// });

module.exports = router;