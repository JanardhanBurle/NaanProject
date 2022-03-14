const mongoose = require('mongoose');
const Joi = require('joi');

const winnerSchema = new mongoose.Schema({
    customerId: Number,
    name: String,
    accountNumber: Number,
    prize: String,
    prizeName: String,
    raffleCode: String,
});

const Winner = mongoose.model('Winner', winnerSchema);

function validateWinner(data) {
    const schema = {
        customerId: Joi.string().required(),
        name: Joi.string().required(),
        prize: Joi.string().required(),
        prizeName: Joi.string().required(),
        raffleCode: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

exports.winnerSchema = winnerSchema;
exports.Winner = Winner;
exports.validateWinner = validateWinner;
