# readme

要连接mongodb数据库需要在根目录下创建**dbConfig.js**文件，其格式为

```javascript
const db = {
    production: {
        username: 'xxx',
        password: 'xxxxxx',
        database: 'database_name',
        host: 'host_ip',
        port: 27017,
        auth: true
    },
    local: {
        username: '',
        password: '',
        database: 'zblog-backend',
        host: '127.0.0.1',
        port: 27017,
        auth: false
    }
};

module.exports = db['production'];
```

// /api/articles?category=xxx&page=xxx&pageSize=xxx

// 根据分类获取文章

// /api/articles?page=xxx&pageSize=xxx

// 后台Table渲染查询的数据

// /api/articles?id=xxx

// 根据id找文章

// // 添加文章 post /articles

// delete /articles/:id

// get /api/author

// get  /api/home

// /api/page/:id

// 分页器获取不同分页的文章卡片展示信息

// /api/category

// 获取分类

// 登录 /login

请求基地址 http://localhost:3000

| 请求类型 | 路径                                             | 描述                                                                                 |
| -------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| get      | /api/articles?category=xxx&page=xxx&pageSize=xxx | 获取文章<br />category：文章分类<br />page：展示的页数<br />pageSize：一页展示的数量 |
|          |                                                  |                                                                                      |
