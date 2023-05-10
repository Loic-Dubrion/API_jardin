const expressSwagger = require('express-jsdoc-swagger');
const logger = require('./logger');

// swagger setup
const swaggerOptions = {
  servers: [
    {
      url: `http://${process.env.PGHOST}:${process.env.PORT}` || 'http://localhost:3000',
    },
  ],
  info: {
    version: '1.0',
    title: 'Connected Garden',
    description: 'API de Connected Garden',
  },
  baseDir: `${__dirname}/app`,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

/**
 * inject swaggerUI in application
 * @param {Object} app - express application
 * @param {string} baseDir - the beaseDir where to serach for docs
 */
function injectSwagger(app, baseDir) {
  logger.info('swagger UI injected');
  swaggerOptions.baseDir = baseDir;
  expressSwagger(app)(swaggerOptions);
}

module.exports = injectSwagger;
