const {Schema, model} = require('mongoose');
const {schemaRole} = require('./Role')

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
        type: schemaRole,
    },
    name: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = {User: model('User', schema), userSchema: schema};
