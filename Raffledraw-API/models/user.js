const mongoose = require('mongoose');
const Joi = require('joi');
const { raffleSchema } = require('./raffle');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    userId: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        required: true

    },
    role: {
        type: String,
        required: true
    },
    operationType: {
        type: String
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    raffles: [
        {
            _id: {
                type: String
            },
            raffleName: {
                type: String
            }
            // type: raffleSchema
        }
    ]
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        userName: Joi.string().min(5).max(50).required(),
        userId: Joi.string().required(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().required(),
        lastLoginDate: Joi.date().required(),
        raffles: Joi.array(),
        operationType: Joi.string()
    }
    return Joi.validate(user, schema);
}


exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;