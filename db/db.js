module.exports = new Promise((resolve, reject) => {
    const dbConfig = require('../dbConfig');
    const mongoose = require('mongoose');
    const { username, password, database, host, port, auth } = dbConfig;

    // 构建连接字符串
    const uri = auth
        ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
        : `mongodb://${host}:${port}/${database}`;

    // 连接到 MongoDB 数据库
    console.log('uri=', uri);
    mongoose.connect(uri)
        .then(() => {
            console.log('数据库连接成功');
            // success();
            resolve('hahahahha');
        })
        .catch(err => {
            console.error('数据库连接失败:', err)
            reject();
        });

    // mongoose.connection.once('open', () => {
    //     console.log('数据库连接成功');
    //     success();
    // });

    // mongoose.connection.on('error', (err) => {
    //     error();
    // });

    mongoose.connection.on('close', () => {
        console.log('数据库连接关闭');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('数据库连接断开');
    });
})
    // 初始化数据库
    .then(async (value) => {
        const Authors = require('../models/AuthorModel');
        await Authors.findOneAndUpdate(
            {},
            {},
            { upsert: true }
        );

    })
// .then((v) => {
//     console.log('v=', v);
// })
