const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../config/config')

// 定义 articles 集合的 Schema
const CategorySchema = new Schema({
    category: {
        type: String,
        default: '未分类',
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;