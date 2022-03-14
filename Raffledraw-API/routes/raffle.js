const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Raffle, validateRaffle } = require('../models/raffle');
const { Promotion } = require('../models/promotion');
const asyncHandler = require('../middleware/asyncHandler');


router.get('/', asyncHandler(async (req, res, next) => {
    let result = {};
    if (req.query && req.query.id) {
        if (req.query.id === 'ALL') {
            result = await Raffle.find().sort('-_id');
        } else
            result = await Raffle.find({ assignedTo: { $elemMatch: { userId: req.query.id } } }).sort('-_id');
    } else
        return res.status(403).send('Access Forbidden ');
    if (!result) return res.status(400).send('No Raffles are available');
    res.send(result);
}));



router.post('/', asyncHandler(async (req, res, next) => {
    let request = req.body;
    delete request._id;
    const { error } = validateRaffle(req.body);
    if (!error) return res.status(400).send(error.details[0].message);
    const promotion = await Promotion.findById(request.promotion);
    if (!promotion) return res.status(400).send(`Invalid Promotion selected.`);
    request.promotion = promotion;
    const raffle = new Raffle(req.body);
    const result = await raffle.save();
    if (!result) return res.status(400).send('No raffle data is available');
    res.send(result);
}));


router.put('/', asyncHandler(async (req, res, next) => {
    let request = req.body;
    const { error } = validateRaffle(req.body);
    if (!error) return res.status(400).send(error.details[0].message);
    const promotion = await Promotion.findById(request.promotion);
    if (!promotion) return res.status(400).send(`Invalid Promotion selected.`);
    request.promotion = promotion;
    console.log(request);
    const result = await Raffle.findByIdAndUpdate(request._id, request, { new: true });
    if (!result) return res.status(400).send('No raffle data is available');
    console.log(result);
    res.send(result);
}));



router.delete('/', asyncHandler(async (req, res, next) => {
    const result = await Raffle.remove({});
    console.log(result);
    if (!result) return res.status(404).send('The result with the given ID was not found.');
    res.send(result);
}));


module.exports = router;