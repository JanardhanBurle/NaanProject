const express = require('express');
const promotion = require('../routes/promotion');
const raffle = require('../routes/raffle');
const users = require('../routes/users');
const auth = require('../routes/auth');
const promotionType = require('../routes/promotion-type');
const error = require('../middleware/error');
const CORS = require('../middleware/cors');


module.exports = function(app) {
    app.use(CORS);
    app.use(express.json());
    app.use('/api/promotion', promotion);
    app.use('/api/raffle', raffle);
    app.use('/api/promotion-type', promotionType);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}