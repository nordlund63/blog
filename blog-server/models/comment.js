const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    likes:{
        type: Number
    }

});

const User = module.export = mongoose.model('user', UserSchema);