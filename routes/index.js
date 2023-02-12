const express = require('express');
const indexRouter = express.Router();

const badPathRouter = require('./badPath');
const compareRouter = require('./compare');

indexRouter.use('/compare', compareRouter);

indexRouter.use(badPathRouter);

module.exports = indexRouter;
