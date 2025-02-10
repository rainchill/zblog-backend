const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../config/config')

// 定义 articles 集合的 Schema
const AuthorSchema = new Schema({
    avatar: {
        type: String,
        default: `${config.HOST}/avatar.jpg`
    },
    name: {
        type: String,
        default: 'rainchill'
    },
    description: {
        type: String,
        default: 'Life is short, code is long.'
    },
    link: {
        type: String,
        default: 'https://github.com/rainchill/zblog'
    }
});

const Authors = mongoose.model('authors', AuthorSchema);


module.exports = Authors;