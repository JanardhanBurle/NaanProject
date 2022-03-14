const mongoose = require('mongoose');
const express = require('express');
const { Auth, validateAuth } = require('../models/auth');
const { User } = require('../models/user');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');

router.post('', asyncHandler(async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    const result = await User.findOne({ userId: req.body.userId });
    console.log(result);
    if (!result) return res.status(400).send('invalid userId');
    if (result.password !== req.body.password) return res.status(400).send('Invalid password');

    return res.send({
        authentication: true,
        userName: result.userName,
        role: result.role,
        lastLoginDate: result.lastLoginDate,
        raffles: result.raffles,
        _id: result._id
    });
}));


router.put('/', asyncHandler(async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result = await User.findOne({ userId: req.body.userId });
    if (!result) return res.status(400).send('Invalid userId');
    const response = await User.update({ userId: req.body.userId }, { password: req.body.password }, { new: true });

    return res.send({
        authentication: true,
        userName: response.userName,
        role: response.role,
        lastLoginDate: response.lastLoginDate,
        raffles: response.raffles,
        _id: response._id
    });
}));


module.exports = router;