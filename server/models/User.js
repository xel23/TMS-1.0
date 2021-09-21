const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 'registered'
    },
    name: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: true
    }
});

module.exports = model('User', schema);
