const { PromotionType } = require('../models/promotion-type');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Promotion, validatePromotion } = require('../models/promotion');
const asyncHandler = require('../middleware/asyncHandler');


router.get('/', asyncHandler(async (req, res) => {
    const result = await Promotion.find().sort('-_id');
    if (!result) return res.status(400).send('No Promotions are available');
    res.send(result);
}));



router.post('/', asyncHandler(async (req, res) => {
    let request = req.body;
    delete request._id;
    const { error } = validatePromotion(request);
    if (error) return res.status(400).send(error.details[0].message);
    const promotionType = await PromotionType.findById(request.promoType);
    if (!promotionType) return res.status(400).send(`Invalid Promotion type.`);
    request.promoType = promotionType;
    const promotion = new Promotion(request);
    const result = await promotion.save();
    if (!result) return res.status(400).send('No Promotions are available');
    res.send(result);
}));


router.put('/', asyncHandler(async (req, res) => {
    let request = req.body;
    const { error } = validatePromotion(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const promoType = await PromotionType.findById(request.promoType);
    if (!promoType) return res.status(400).send(`Invalid promo type: ${request._id}`);
    request.promoType = {
        _id: promoType._id,
        name: promoType.name
    };
    const promotion = await Promotion.findByIdAndUpdate(request._id, request, { new: true });
    if (!promotion) return res.status(404).send('The promotion with the given ID was not found.');
    res.send(promotion);
}));




router.delete('/', asyncHandler(async (req, res) => {
    try {
        const result = await Promotion.remove({});
        console.log(result);
        if (!result) return res.status(404).send('The Promotion with the given ID was not found.');
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}));



module.exports = router;