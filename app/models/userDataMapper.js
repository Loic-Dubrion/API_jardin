const client = require('../services/clientdb');

const userDataMapper = {
  //! Models for Reading
  getUserByEmail: (email) => {
    const query = 'SELECT * FROM "user" WHERE "email" = $1';
    const values = [email];
    return client.query(query, values);
  },
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
  insertPlot: (userId, objPlot) => {
    const query = 'SELECT * FROM insert_new_plot($1, $2);';
    const values = [userId, objPlot];
    return client.query(query, values);
  },
  insertCulture: (plotId, objCulture) => {
    const query = 'SELECT * FROM insert_new_culture($1, $2);';
    const values = [plotId, objCulture];
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

  //! Models for Verify
  findPlotByIdAndUserId: (plotId, userId) => {
    const query = 'SELECT * FROM plot WHERE id = $1 AND id_user = $2;';
    const values = [plotId, userId];
    const promiseData = client.query(query, values);
    return promiseData;
  },

  findCultureByIdAndUserId: (cultureId, userId) => {
    const query = `
        SELECT *
        FROM culture
        INNER JOIN plot ON culture.id_plot = plot.id
        WHERE culture.id = $1 AND plot.id_user = $2;
      `;
    const values = [cultureId, userId];
    const promiseData = client.query(query, values);
    return promiseData;
  },

};

module.exports = userDataMapper;
