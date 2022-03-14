
const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const config = require('config');

module.exports = function () {

    if (!config.get('jwtPrivateKey')) {
        logger.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
    }
    mongoose.connect(config.get('db'), { useNewUrlParser: true })
        .then(() => logger.info(`Connected to ${config.get('db')}...............`))
        .catch(error => logger.error(new Error('Error', error)));
}