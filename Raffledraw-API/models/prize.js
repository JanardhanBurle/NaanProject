const Joi = require('joi');
const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
    name: String,
    content: String,
    fileStatus: String
});

const Prize = mongoose.model('Prize', prizeSchema);


function validatePrize(data) {
    const schema = {
        name: Joi.string().required(),
        content: Joi.string().require()
    }
    return Joi.validate(data, schema);
}


exports.prizeSchema = prizeSchema;
exports.Prize = Prize;
exports.validatePrize = validatePrize;