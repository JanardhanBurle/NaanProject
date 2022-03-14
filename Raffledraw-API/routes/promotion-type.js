const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { PromotionType, validatePromotionType } = require('../models/promotion-type');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
    const result = await PromotionType.find().sort('-Date');
    if (!result) return res.status(400).send('No Raffles are available');
    res.send(result);
}));

router.post('/', asyncHandler(async (req, res) => {
    const promoType = new PromotionType(req.body);
    const result = await promoType.save();
    if (!result) return res.status(400).send('No promoType data is available');
    res.send(result);
}));


router.put('/', asyncHandler(async (req, res) => {
    const { error } = validatePromotionType(req.body);
    if (!error) return res.status(400).send(error.details[0].message);
    const result = await PromotionType.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!result) return res.status(400).send('No raffle data is available');
    console.log(result);
    res.send(result);
}));



router.delete('/', asyncHandler(async (req, res) => {
    const result = await PromotionType.remove({});
    console.log(result);
    if (!result) return res.status(404).send('The result with the given ID was not found.');
    res.send(result);
}));


module.exports = router;