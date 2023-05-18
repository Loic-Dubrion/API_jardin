const client = require('../services/clientdb');

const plantDataMapper = {
  //! Models for Read
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
  //! Models for Create
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

  //! Models for Update
  updatePlant: (plantObj, plantId) => {
    const query = 'SELECT * FROM update_plant($1, $2)';
    const values = [plantId, plantObj];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  updateFamily: (familyObj, familyId) => {
    const query = 'SELECT * FROM update_family($1, $2)';
    const values = [familyObj, familyId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  updateCategory: (categoryObj, categoryId) => {
    const query = 'SELECT * FROM update_category($1, $2)';
    const values = [categoryObj, categoryId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  updateAlliance: (allianceObj, allianceId) => {
    const query = 'SELECT * FROM update_alliance($1, $2)';
    const values = [allianceObj, allianceId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
};

module.exports = plantDataMapper;
