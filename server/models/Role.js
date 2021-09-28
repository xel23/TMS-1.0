const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    updateTask: {
        type: Boolean
    },
    createTask: {
        type: Boolean
    },
    deleteTask: {
        type: Boolean
    },
    readUser: {
        type: Boolean
    },
    updateUser: {
        type: Boolean
    },
    createUser: {
        type: Boolean
    },
    deleteUser: {
        type: Boolean
    },
});

module.exports = model('Role', schema);
