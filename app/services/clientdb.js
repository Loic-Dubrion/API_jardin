const logger = require('../helpers/logger');
const { Client } = require('pg');

// Création d'une instance de la classe Client via les données du fichier .env
const client = new Client();

// Connexion et vérification de la base de données
client.connect(() => {
  logger.info('Connexion à la BDD réussie');
});

// Export du module
module.exports = client;
