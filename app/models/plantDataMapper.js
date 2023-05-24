const client = require('../services/clientdb');

const plantDataMapper = {
  //! Models for Read
  getAllPlants: () => {
    const query = 'SELECT * FROM plants_details';
    const promiseData = client.query(query);
    return promiseData;
  },
  getCategories: () => {
    const query = 'SELECT * FROM get_categories';
    const promiseData = client.query(query);
    return promiseData;
  },
  getFamilies: () => {
    const query = 'SELECT * FROM get_families';
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

  //! Models for Delete
  deletePlant: (plantId) => {
    const query = 'SELECT * FROM delete_plant($1)';
    const values = [plantId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  deleteFamily: (familyId) => {
    const query = 'SELECT * FROM delete_family($1)';
    const values = [familyId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  deleteCategory: (categoryId) => {
    const query = 'SELECT * FROM delete_category($1)';
    const values = [categoryId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  deleteAlliance: (allianceId) => {
    const query = 'SELECT * FROM delete_alliance($1)';
    const values = [allianceId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
};

module.exports = plantDataMapper;
