const client = require('../services/clientdb');

const userDataMapper = {
  getProfil: (userId) => {
    const query = `SELECT * FROM get_user_details($1);`
    const values = [userId];
    return client.query(query, values);
  },
  getProduction: (userId, isHarvestingNull, plotId = null, cultureId = null) => {
    const query = `SELECT * FROM get_production_by_user($1, $2, $3, $4);`
    const values = [userId, isHarvestingNull, plotId, cultureId];
    return client.query(query, values);
  },
};


module.exports = userDataMapper;