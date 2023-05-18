const client = require('../services/clientdb');

const userDataMapper = {
  // Models for "get"
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

  // Models for "Post"
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
};

module.exports = userDataMapper;
