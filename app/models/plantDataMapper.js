const client = require('../services/clientdb');

const plantDataMapper = {
  getAllPlants: () => {
    const query = `SELECT * FROM plant_details`;
    const promiseData = client.query(query);
    return promiseData;
  },
};


module.exports = plantDataMapper;
