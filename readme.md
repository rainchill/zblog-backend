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

## 使用

安装数据库

```bash
# 导入 MongoDB 的 GPG 密钥
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg
# 添加 MongoDB 的软件源
# Ubuntu 24.04 (Noble)
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
# Ubuntu 22.04 (Jammy)
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

sudo apt update
sudo apt-get install -y mongodb-org
mongod --version
# 启动 MongoDB 服务
sudo systemctl start mongod
# 验证 MongoDB 是否运行
sudo systemctl status mongod
# 配置开机自启
sudo systemctl enable mongod
```

修改 MongoDB 配置文件 /etc/mongod.conf

```bash
# 允许外部网络访问
net:
  bindIp: 0.0.0.0
  port: 27017
# 启用认证
security:
  authorization: "enabled"
```

保存配置重启服务

```bash
sudo systemctl restart mongod
```

创建管理员用户

```bash
mongosh
> use admin
> db.createUser({
  user: "admin",
  pwd: "your_strong_password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})
```

验证连接

```bash
mongosh --host 127.0.0.1 --port 27017 -u admin -p your_strong_password
```

## API

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
