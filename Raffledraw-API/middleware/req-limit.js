
const body_parser = require('body-parser');
const express = require('express');

module.exports = function (app) {
    app.use(body_parser.json({ limit: '50mb' }));
    app.use(body_parser.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({ limit: '50mb' }));
}