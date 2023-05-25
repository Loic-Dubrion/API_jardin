const client = require('../services/clientdb');

const executeQuery = async (query, values) => client.query(query, values);

const plantDataMapper = {
  //! Models for Read
  getAllPlants: () => executeQuery('SELECT * FROM plants_details'),
  getCategories: () => executeQuery('SELECT * FROM get_categories'),
  getFamilies: () => executeQuery('SELECT * FROM get_families'),
  getOnePlant: (plantId) => executeQuery('SELECT * FROM get_plant_detail($1)', [plantId]),

  //! Models for Create
  postPlant: (plantObj) => executeQuery('SELECT * FROM insert_new_plant($1)', [plantObj]),
  postFamily: (familyObj) => executeQuery('SELECT * FROM insert_new_family($1)', [familyObj]),
  postCategory: (categoryObj) => executeQuery('SELECT * FROM insert_new_category($1)', [categoryObj]),
  postAlliance: (allianceObj) => executeQuery('SELECT * FROM insert_new_alliance($1)', [allianceObj]),

  //! Models for Update
  updatePlant: (plantObj, plantId) => executeQuery('SELECT * FROM update_plant($1, $2)', [plantId, plantObj]),
  updateFamily: (familyObj, familyId) => executeQuery('SELECT * FROM update_family($1, $2)', [familyObj, familyId]),
  updateCategory: (categoryObj, categoryId) => (
    executeQuery('SELECT * FROM update_category($1, $2)', [categoryObj, categoryId])
  ),
  updateAlliance: (allianceObj, allianceId) => (
    executeQuery('SELECT * FROM update_alliance($1, $2)', [allianceObj, allianceId])
  ),

  //! Models for Delete
  deletePlant: (plantId) => executeQuery('SELECT * FROM delete_plant($1)', [plantId]),
  deleteFamily: (familyId) => executeQuery('SELECT * FROM delete_family($1)', [familyId]),
  deleteCategory: (categoryId) => executeQuery('SELECT * FROM delete_category($1)', [categoryId]),
  deleteAlliance: (allianceId) => executeQuery('SELECT * FROM delete_alliance($1)', [allianceId]),
};

module.exports = plantDataMapper;
