const Joi = require('joi');
const mongoose = require('mongoose');

const promotionTypeSchema = new mongoose.Schema({
    name: String
});

const PromotionType = mongoose.model('PromotionType', promotionTypeSchema);


function validatePromotionType(data) {
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(data, schema);
}


exports.promotionTypeSchema = promotionTypeSchema;
exports.PromotionType = PromotionType;
exports.validatePromotionType = validatePromotionType;