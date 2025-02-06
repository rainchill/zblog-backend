module.exports = function (success, error) {
    require('dotenv').config();
    const mongoose = require('mongoose');

    // 从环境变量中读取连接信息
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST;
    const port = process.env.MONGO_PORT;
    const database = process.env.MONGO_DATABASE;

    // 构建连接字符串
    const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

    // 连接到 MongoDB 数据库
    // mongoose.connect('mongodb://127.0.0.1:27017/zblog-backend')
    mongoose.connect(uri)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB:', err));


    mongoose.connection.once('open', () => {
        console.log('数据库连接成功');
        success();
    });

    mongoose.connection.on('error', (err) => {
        error();
    });

    mongoose.connection.on('close', () => {
        console.log('数据库连接关闭');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('数据库连接断开');
    });
}