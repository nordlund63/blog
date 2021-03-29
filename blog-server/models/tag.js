const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Tag = module.export = mongoose.model('tag', TagSchema);