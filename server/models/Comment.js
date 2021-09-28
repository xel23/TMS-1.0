const {Schema, model} = require('mongoose');

const schema = new Schema({
    taskId: {
        type: String
    },
    text: {
        type: String
    },
    author: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Comment', schema);
