const { Raffle } = require('../models/raffle');
const Fawn = require('fawn');
const _ = require('lodash');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');


Fawn.init(mongoose);

router.get('/', asyncHandler(async (req, res) => {
    const result = await User.find().sort('-_id');
    if (!result) return res.status(400).send('No Users are available');
    const response = result.map(item => _.pick(item, ['_id', 'userName', 'userId', 'role', 'lastLoginDate', 'raffles']));
    res.send(response);
}));



router.post('/', asyncHandler(async (req, res) => {
    let request = req.body;
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ userId: req.body.userId });
    if (user) return res.status(400).send(`User is already registered using userId: ${req.body.userId}`);
    user = new User(_.pick(req.body, ['userName', 'userId', 'password', 'role', 'lastLoginDate', 'raffles']));
    const result = await user.save();
    res.send(_.pick(user, ['_id', 'userName', 'userId', 'role', 'lastLoginDate', 'raffles']));
}));


router.put('/', asyncHandler(async (req, res) => {
    let request = req.body;
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const raffles = await Raffle.find().sort('-_id');
    raffles.forEach(async (raffle) => {
        const index = request.raffles.findIndex(x => x._id == (raffle._id));
        if (index <= -1) {
            const userIndex = raffle.assignedTo.findIndex(user => user.userId === request._id);
            if (userIndex > -1) {
                raffle.assignedTo.splice(userIndex, 1);
            }
        } else {
            const userIndex = raffle.assignedTo.findIndex(user => user.userId === request._id);
            if (userIndex <= -1) {
                raffle.assignedTo.push({ userId: request._id, userName: request.userName });
            }
        }
        const result = await Raffle.findByIdAndUpdate(raffle._id, raffle, { new: true });
        if (!result) return res.send('unable to add the user to raffle.');
    });


    const result = await User.findByIdAndUpdate(request._id, request, { new: true });
    if (!result) return res.status(400).send('No User data is available');
    res.send(result);

}));



function validate(user) {
    const schema = {
        userName: Joi.string().min(5).max(50).required(),
        userId: Joi.string().required(),
        role: Joi.string().required(),
        lastLoginDate: Joi.date().required(),
        raffles: Joi.array(),
        _id: Joi.string(),
        operationType: Joi.string(),
        assignedTo: Joi.array()
    }
    return Joi.validate(user, schema);
}


router.delete('/', asyncHandler(async (req, res) => {
    const result = await User.remove({ 'userId': req.query.userId });
    console.log(result);
    if (!result) return res.status(404).send('The result with the given ID was not found.');
    res.send(result);
}));


module.exports = router;