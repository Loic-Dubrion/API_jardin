// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const plantRouter = require('./plantRouter');
const userRouter = require('./userRouter');
const logRouter = require('./logRouter');

const NoResourceFoundError = require('../../errors/NoResourceFoundError');
const apiErrorHandler = require('../../errors/apiErrorHandler');

const router = express.Router();

router.use('/log', logRouter);
router.use('/plants', plantRouter);
router.use('/users', userRouter);

router.use((request, response, next) => {
  next(new NoResourceFoundError());
});

router.use((err, req, res, next) => {
  apiErrorHandler(err, req, res);
  next();
});

module.exports = router;
