const logger = require('../helpers/logger');
const { Pool } = require('pg');

const client = new Pool();
/**
 * Database connection and verification
 * @callback function
 */
client.connect(() => {
  logger.info('Connexion à la BDD réussie');
});

module.exports = client;
