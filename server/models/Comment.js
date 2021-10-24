const {Schema, model} = require('mongoose');

const schema = new Schema({
    taskId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    edited: {
        type: Boolean
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Comment', schema);
