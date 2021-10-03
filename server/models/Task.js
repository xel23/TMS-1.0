const {Schema, model} = require('mongoose');

const schema = new Schema({
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: {
            name: String,
            userId: String
        },
        required: true
    },
    assignee: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    subsystem: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date
    },
    updatedBy: {
        type: {
            name: String,
            userId: String
        }
    },
    verifiedBy: {
        type: String
    }
});

module.exports = model('Task', schema);
