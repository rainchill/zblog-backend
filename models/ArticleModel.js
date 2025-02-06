const mongoose = require('mongoose');
const { Schema } = mongoose;

// 定义 articles 集合的 Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true // 标题是必填字段
    },
    date: {
        type: Date,
        default: Date.now // 默认值为当前日期和时间
    },
    category: {
        type: String,
        required: true // 分类是必填字段
    },
    cover: {
        type: String,
    },
    tags: [String],
    comments: [
        {
            username: {
                type: String,
                required: true // 评论者用户名是必填字段
            },
            content: {
                type: String,
                required: true // 评论内容是必填字段
            }
        }
    ],
    description: {
        type: String,
        // required: true // 描述是必填字段
    }
});

const Articles = mongoose.model('articles', ArticleSchema);

module.exports = Articles;