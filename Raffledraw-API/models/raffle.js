const { promotionSchema } = require('../models/promotion');

const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { winnerSchema } = require('../models/winner');


const raffleSchema = new mongoose.Schema({

    raffleName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    raffleRef: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    raffleDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    promotion: {
        type: promotionSchema
    },
    raffleType: {
        type: Number,
        required: true
    },
    winners: [
        { type: winnerSchema }
    ],
    participants: [{
        customerId: String,
        customerName: String,
        accountNo: String,
    }],
    raffleDataFileName: String,
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    assignedTo: [new mongoose.Schema({
        userId: {
            type: String
        },
        userName: {
            type: String
        }
    })]
});

const Raffle = mongoose.model('Raffle', raffleSchema);

function validateRaffle(data) {
    const schema = Joi.object().keys({
        raffleName: Joi.string().required(),
        raffleDate: Joi.string().required(),
        promotion: Joi.objectId().required(),
        raffleType: Joi.number().required(),
        winners: Joi.array(),
        participants: Joi.array(),
        isCompleted: Joi.boolean().required(),
        assignedTo: Joi.array(),
        createdBy: Joi.string().required(),
        createdOn: Joi.string().required()
    });
    return Joi.validate(data, schema);
}

exports.raffleSchema = raffleSchema;
exports.Raffle = Raffle;
exports.validateRaffle = validateRaffle;

