const client = require('../services/clientdb');

const plantDataMapper = {
  getAllPlants: () => {
    const promiseData = client.query('SELECT * FROM plant');
    return promiseData;
  },
};

module.exports = plantDataMapper;
