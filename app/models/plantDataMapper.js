const client = require('../services/clientdb');

const plantDataMapper = {
  //! Models for "get" routers
  getAllPlants: () => {
    const query = 'SELECT * FROM plants_details';
    const promiseData = client.query(query);
    return promiseData;
  },
  getOnePlant: (plantId) => {
    const query = 'SELECT * FROM get_plant_detail($1)';
    const values = [plantId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  //! Models for "post" routers
  postPlant: (plantObj) => {
    const query = 'SELECT * FROM insert_new_plant($1)';
    const values = [plantObj];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  postFamily: (familyObj) => {
    const query = 'SELECT * FROM insert_new_family($1)';
    const values = [familyObj];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  postCategory: (categoryObj) => {
    const query = 'SELECT * FROM insert_new_category($1)';
    const values = [categoryObj];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  postAlliance: (allianceObj) => {
    const query = 'SELECT * FROM insert_new_alliance($1)';
    const values = [allianceObj];
    const promiseData = client.query(query, values);
    return promiseData;
  },
};

module.exports = plantDataMapper;
