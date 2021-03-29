const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    tags: [{ 
        type: Schema.Types.ObjectId, 
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

const User = module.export = mongoose.model('user', UserSchema);