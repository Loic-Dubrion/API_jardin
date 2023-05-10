const bunyan = require('bunyan');

const env = process.env.NODE_ENV;
const streams = [];

// If dev environment, add the console flow (Stdout)
if (env === 'development') {
  streams.push({
    stream: process.stdout,
    level: 'debug',
  });
}

// If prod environment, add the flow in the file logs/
if (env === 'production') {
  streams.push({
    path: 'logs/connected_garden.log',
    level: 'error',
    type: 'rotating-file',
    period: '3000ms',
    count: 10,
  });
}

const logger = bunyan.createLogger({
  name: 'Connected Garden', // nom du logger ( car on peut en avoir plusieurs )
  level: 'trace', // niveau minimum des erreurs à afficher
  streams,
});

module.exports = logger;
