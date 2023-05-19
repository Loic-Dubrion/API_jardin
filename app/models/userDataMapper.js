const client = require('../services/clientdb');

const userDataMapper = {
  //! Models for Reading
  getProfil: (userId) => {
    const query = 'SELECT * FROM get_user_details($1);';
    const values = [userId];
    return client.query(query, values);
  },
  getProduction: (userId, isHarvestingNull, plotId = null, cultureId = null) => {
    const query = 'SELECT * FROM get_production_by_user($1, $2, $3, $4);';
    const values = [userId, isHarvestingNull, plotId, cultureId];
    return client.query(query, values);
  },
  getLastCultures: (plotId) => {
    const query = 'SELECT * FROM get_last_cultures($1);';
    const values = [plotId];
    return client.query(query, values);
  },
  getAlliance: (familyId) => {
    const query = 'SELECT * FROM get_alliance($1);';
    const values = [familyId];
    return client.query(query, values);
  },

  //! Models for Creating
  insertPlot: (objPlot) => {
    const query = 'SELECT * FROM insert_new_plot($1);';
    const values = [objPlot];
    return client.query(query, values);
  },
  insertCulture: (objCulture) => {
    const query = 'SELECT * FROM insert_new_culture($1);';
    const values = [objCulture];
    return client.query(query, values);
  },

  //! Models for Updating
  updateUser: (objUser, userId) => {
    const query = 'SELECT * FROM update_user($1, $2);';
    const values = [objUser, userId];
    return client.query(query, values);
  },

  updatePlot: (objPlot, plotId) => {
    const query = 'SELECT * FROM update_plot($1, $2);';
    const values = [objPlot, plotId];
    return client.query(query, values);
  },

  updateCulture: (objCulture, cultureId) => {
    const query = 'SELECT * FROM update_culture($1, $2);';
    const values = [objCulture, cultureId];
    return client.query(query, values);
  },

  //! Models for Delete
  deleteUser: (userId) => {
    const query = 'SELECT * FROM delete_user($1)';
    const values = [userId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  deletePlot: (plotId) => {
    const query = 'SELECT * FROM delete_plot($1)';
    const values = [plotId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
  deleteCulture: (cultureId) => {
    const query = 'SELECT * FROM delete_culture($1)';
    const values = [cultureId];
    const promiseData = client.query(query, values);
    return promiseData;
  },
};

module.exports = userDataMapper;
