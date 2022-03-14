const express = require('express');
const app = express();
const logger = require('./helpers/logger');
require('./middleware/req-limit')(app);
require('./startup/routes')(app);
require('./startup/exceptionsHandler')();
require('./startup/db-connection')();
const port = process.env.PORT || 3000;
console.log(process.env.NODE);
const server = app.listen(port, () => logger.info(`Listening to port ${port}...`));

module.exports = server;