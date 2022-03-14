const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { prizeSchema } = require('../models/prize');
const { promotionTypeSchema } = require('../models/promotion-type');


const promotionSchema = new mongoose.Schema({
    promoName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    promoType: {
        type: promotionTypeSchema,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    typeOfWinner: {
        type: Number,
        default: null
    },
    approvalRequired: {
        type: Boolean,
        required: true,
        default: false
    },
    noOfWinners: {
        type: Number
    },
    noOfPrizes: {
        type: Number
    },
    standByWinnerRequired: {
        type: Boolean,
        required: true,
        default: false
    },
    prizes: [
        { type: prizeSchema }
    ],
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

function validatePromotion(data) {
    console.log(data);

    const schema = Joi.object().keys({
        _id: Joi.objectId(),
        promoName: Joi.string().min(5).max(100).required(),
        promoType: Joi.objectId().required(),
        scheduledDate: Joi.date().required(),
        approvalRequired: Joi.boolean().required(),
        typeOfWinner: Joi.number().allow(null),
        noOfPrizes: Joi.number().allow(null),
        noOfWinners: Joi.number().allow(null),
        standByWinnerRequired: Joi.boolean().required(),
        isCompleted: Joi.boolean().required(),
        prizes: Joi.array()
    });
    console.log(Joi.validate(data, schema));
    return Joi.validate(data, schema);
}

exports.promotionSchema = promotionSchema;
exports.Promotion = Promotion;
exports.validatePromotion = validatePromotion;

