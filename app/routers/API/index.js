// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const plantRouter = require('./plantRouter');
// const { apiController } = require(' ');
const NoResourceFoundError = require('../../errors/NoResourceFoundError');
const apiErrorHandler = require('../../errors/apiErrorHandler');

const router = express.Router();

/**
 * GET /api
 *
 * @summary get API documentation URL
 * @tags Docs - The Connected Garden's API documentation
 *
 * @return {object} 200 - success response
 */

router.use('/plants', plantRouter);

router.use((request, response, next) => {
  next(new NoResourceFoundError());
});

// Need all params so disable eslint
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  apiErrorHandler(err, req, res);
});

module.exports = router;
