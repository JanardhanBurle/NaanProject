const mongoose = require('mongoose');
const Joi = require('joi');
const authSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const Auth = mongoose.model('Auth', authSchema);

function validateAuth(data) {
    const schema = {
        userId: Joi.string().max(255).required(),
        password: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(data.schema);
}


exports.Auth = Auth;
exports.validateAuth = validateAuth;