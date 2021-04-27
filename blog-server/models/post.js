const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    tags: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag'
    }],
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

});

const Post = module.exports = mongoose.model('post', PostSchema);