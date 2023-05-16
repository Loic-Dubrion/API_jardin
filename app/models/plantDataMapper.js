const client = require('../services/clientdb');

const plantDataMapper = {
  getAllPlants: () => {
    const query = `SELECT * FROM plant_details`;
    const promiseData = client.query(query);
    return promiseData;
  },
  getOnePlant: (plantId) => {
    const query = `SELECT * FROM get_plant_detail($1)`;
    const values = [plantId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
};


module.exports = plantDataMapper;
