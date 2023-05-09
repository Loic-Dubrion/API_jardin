const expressSwagger = require('express-jsdoc-swagger');
const logger = require('./logger');

// swagger setup
const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'Connected Garden API',
    description: '',
  },
  filesPattern: './**/*.js',
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs',
  exposeSwaggerUI: true,
};

/**
 * inject swaggerUI in application
 * @param {Object} app - express application
 * @param {string} baseDir - the beaseDir where to serach for docs
 */
function injectSwagger(app, baseDir) {
  logger.log('swagger UI injected');
  swaggerOptions.baseDir = baseDir;
  expressSwagger(app)(swaggerOptions);
}

module.exports = injectSwagger;
