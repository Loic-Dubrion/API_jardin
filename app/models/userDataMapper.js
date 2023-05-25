const client = require('../services/clientdb');

const executeQuery = async (query, values) => client.query(query, values);

const userDataMapper = {
  //! Models for Read
  getAllUsers: () => executeQuery('SELECT * FROM get_all_users()'),
  getUserByEmail: (email) => executeQuery('SELECT * FROM "user" WHERE "email" = $1', [email]),
  getProfil: (userId) => executeQuery('SELECT * FROM get_user_details($1);', [userId]),
  getProduction: (userId, isHarvestingNull, plotId = null, cultureId = null) => (
    executeQuery('SELECT * FROM get_production_by_user($1, $2, $3, $4);', [userId, isHarvestingNull, plotId, cultureId])
  ),
  getLastCultures: (plotId) => (
    executeQuery('SELECT * FROM get_last_cultures($1);', [plotId])
  ),
  getAlliance: (familyId) => executeQuery('SELECT * FROM get_alliance($1);', [familyId]),

  //! Models for Create
  insertUser: (objUser) => executeQuery('SELECT * FROM insert_new_user($1);', [objUser]),
  insertPlot: (userId, objPlot) => executeQuery('SELECT * FROM insert_new_plot($1, $2);', [userId, objPlot]),
  insertCulture: (plotId, objCulture) => (
    executeQuery('SELECT * FROM insert_new_culture($1, $2);', [plotId, objCulture])
  ),

  //! Models for Update
  updateUser: (objUser, userId) => executeQuery('SELECT * FROM update_user($1, $2);', [objUser, userId]),
  updatePlot: (objPlot, plotId) => executeQuery('SELECT * FROM update_plot($1, $2);', [objPlot, plotId]),
  updateCulture: (objCulture, cultureId) => (
    executeQuery('SELECT * FROM update_culture($1, $2);', [objCulture, cultureId])
  ),

  //! Models for Delete
  deleteUser: (userId) => executeQuery('SELECT * FROM delete_user($1)', [userId]),
  deletePlot: (plotId) => executeQuery('SELECT * FROM delete_plot($1)', [plotId]),
  deleteCulture: (cultureId) => executeQuery('SELECT * FROM delete_culture($1)', [cultureId]),

  //! Models for Verify
  findPlotByIdAndUserId: (plotId, userId) => (
    executeQuery('SELECT * FROM plot WHERE id = $1 AND id_user = $2;', [plotId, userId])
  ),
  findCultureByIdAndUserId: (cultureId, userId) => executeQuery(`
      SELECT *
      FROM culture
      INNER JOIN plot ON culture.id_plot = plot.id
      WHERE culture.id = $1 AND plot.id_user = $2;
    `, [cultureId, userId]),
};

module.exports = userDataMapper;
