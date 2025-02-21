var express = require('express');
const multer = require('multer');
var router = express.Router();
const Articles = require('../../models/ArticleModel');
const Authors = require('../../models/AuthorModel');
// const Category = require('../../models/CategoryModel');

// /api/articles?category=xxx&page=xxx&pageSize=xxx
// 根据分类获取文章

// /api/articles?page=xxx&pageSize=xxx
// 后台Table渲染查询的数据

// /api/articles?id=xxx
// 根据id找文章
router.get('/articles', async (req, res, next) => {
    try {
        const { category, id, page, pageSize } = req.query;
        if (category && page && pageSize) {
            console.log('category=', category, 'page=', page, 'pageSize=', pageSize);
            const skip = (page - 1) * pageSize;
            const total = await Articles.countDocuments({ category: category });
            const articles = await Articles.find({ category: category })
                // .select('title category date cover tags')
                .sort({ date: -1 })
                .skip(skip)
                .limit(pageSize);

            res.json({ total, articles });
        } else if (page && pageSize) {
            const skip = (page - 1) * pageSize;
            const total = await Articles.countDocuments();
            const articles = await Articles.find().select('title category date cover tags').sort({ date: -1 }).skip(skip).limit(pageSize);

            res.json({ total, articles })
        } else if (id) {
            const articles = await Articles.findById(id);
            res.json(articles);
        }
    } catch (err) {
        console.error('查询文章失败:', err);
    }
})
// 添加文章
router.post('/articles', async (req, res, next) => {
    try {
        const newArticle = new Articles(req.body);
        await newArticle.save();
        // await Category.findOneAndUpdate(
        //     { category: req.body.category },
        //     { $inc: { count: 1 } },
        //     { upsert: true }
        // );
        res.status(201).send(newArticle);
    } catch (err) {
        console.error('Failed to add article:', err);
        res.status(500).json({ error: 'Failed to add article' });
    }
});

// 添加评论
router.post('/comments', async (req, res, next) => {
    try {
        const { articleID, ...newComment } = req.body;
        console.log('articleID=', articleID, 'newComment=', newComment);
        const result = await Articles.findByIdAndUpdate(
            articleID,
            {
                $push: {
                    comments: newComment
                }
            },
            { new: true }
        )
        // console.log('更新后的文章：', res);
        res.status(201).send(newComment);
    } catch (err) {
        console.error('Failed to add commment:', err);
        res.status(500).json({ error: 'Failed to add commment' });
    }
})

// 删除文章
router.delete('/articles/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Articles.findById(id);
        // console.log('delete article=', article);
        // const category = await Category.findOneAndUpdate(
        //     { category: article.category },
        //     { $inc: { count: -1 } },
        //     { new: true }
        // );
        // if (category) {
        //     if (category.count === 0) {
        //         await Category.deleteOne({ category: article.category });
        //         // console.log('分类条目', article.category, '已经删除');
        //     }
        // }
        await Articles.findByIdAndDelete(id);
        res.status(204).send(); // 返回 204 表示删除成功
    } catch (err) {
        console.error('Failed to delete article:', err);
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

// /api/author
// 获取author card信息
router.get('/author', async (req, res, next) => {
    try {
        const author = await Authors.findOne();
        const category = await Articles.aggregate([
            {
                $group: {
                    _id: '$category',
                },
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        const totalCategories = category.length;
        const totalArticles = await Articles.countDocuments();
        // 使用聚合管道查询所有 tags
        const tagsRes = await Articles.aggregate([
            { $unwind: '$tags' }, // 展开 tags 数组
            { $group: { _id: null, allTags: { $addToSet: '$tags' } } } // 收集所有 tags 并去重
        ]);
        let totalTags = 0;
        if (tagsRes.length !== 0) {
            totalTags = tagsRes[0].allTags.length;
        }
        res.json({ ...author.toJSON(), totalArticles, totalTags, totalCategories });
    } catch (err) {
        console.error('获取作者信息失败:', err);
    }
})

// /api/home
// 加载首页需要获取的json数据
router.get('/home', async (req, res, next) => {
    try {
        const limit = 8;
        // 查询总文章数量
        const total = await Articles.countDocuments();
        // 计算总页数
        const totalPages = Math.ceil(total / limit);
        const cardList = await Articles.find().sort({ date: -1 }).limit(limit);
        console.log('cardList:', cardList);
        const author = await Authors.findOne()
        const homeData = { total, totalPages, cardList: cardList, author: author };
        res.json(homeData);

    } catch (err) {
        console.error('查询文章失败:', err);
    }
})

// /api/page/:id
// 分页器获取不同分页的文章卡片展示信息
router.get('/page/:id', async (req, res, next) => {
    const id = req.params.id;
    const pageData = await getPage(id);
    res.json(pageData);
})


async function getPage(id, limit = 8) {
    try {
        const skip = (id - 1) * limit
        const newCardList = await Articles.find().sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        return { newCardList };
    } catch (err) {
        console.error('查询文章失败:', err);
    }
}


// /api/category
// 获取分类
router.get('/category', async (req, res, next) => {
    try {
        const category = await Articles.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                },
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.json(category);
    } catch (err) {
        console.log('查询分类失败:', err);
    }
})

// // /api/category?v=xxx&page=xxx
// // 获取xxx分类的文章
// router.get('/category', async (req, res, next) => {
//     try {
//         const v = req.query.v;
//         const articles = Articles.find({ category: v }).sort({ date: -1 })
//     } catch (err) {
//         console.log('获取分类的文章失败:', err);
//     }
// })


// /api/category
// 添加xxx分类 post
// router.post('/category', async (req, res, next) => {
//     try {

//     } catch (err) {
//         console.log('添加分类失败:', err);
//     }
// })

// 登录
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 这里可以添加实际的用户验证逻辑
    if (username === 'admin' && password === '123456') {
        // 假设验证成功，返回一个 token
        const token = 'secret-token';
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
});


// 上传文章 uploads
// 自定义文件存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 指定文件存储目录
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 使用原始文件名
    }
});

// 文件过滤器，用于解决中文文件名乱码问题
const fileFilter = (req, file, callback) => {
    // 将文件名从 latin1 编码转换为 utf8 编码
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// 上传文章 /api/upload -> ./uploads/xxx.md
router.post('/upload', upload.single('files'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send({ message: 'File uploaded successfully', filename: file.filename });
});


module.exports = router;