const {Schema, model} = require('mongoose');

const schema = new Schema({
    taskId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: {
            name: String,
            userId: String
        },
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    added: {
        type: Object
    },
    removed: {
        type: Object
    }
});

module.exports = model('History', schema);
