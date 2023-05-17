const dataMapper = require('../../models/plantDataMapper');

const plantController = {
  /**
   * plant API controller for GET /plants
   * Recovers all API plants
   *
   * @param {object} request
   * @param {object} response
   * @returns {Array} - An array of plant objects in the response body.
   */
  async getAllPlants(request, response) {
    const result = await dataMapper.getAllPlants();
    response.json(result.rows);
  },

  /**
   * plant API controller for GET /plants
   * Recovers One API plant
   *
   * @param {object} request
   * @param {object} response
   * @returns {Array} - An array of plant objects in the response body.
   */
  async getOnePlant(request, response) {
    const plantId = Number(request.params.plantId);
    const result = await dataMapper.getOnePlant(plantId);
    if (result.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No plant found with these parameters.' });
    } else {
      response.json(result.rows);
    }
    response.json(result.rows);
  },

  /**
   * plant API controller for POST /plants
   * Create a new plant
   *
   * @param {object} request - Contains the body with plant information
   * @param {object} response
   * @returns {object} - The new plant object in the response body.
   */
  async postPlant(request, response) {
    const newPlant = await dataMapper.postPlant(request.body);
    response.json(newPlant.rows);
  },

  /**
   * plant API controller for POST /families
   * Create a new family
   *
   * @param {object} request - Contains the body with family information
   * @param {object} response
   * @returns {object} - The new family object in the response body.
   */
  async postFamily(request, response) {
    const newFamily = await dataMapper.postFamily(request.body);
    response.json(newFamily.rows);
  },

  /**
   * plant API controller for POST /categories
   * Create a new category
   *
   * @param {object} request - Contains the body with category information
   * @param {object} response
   * @returns {object} - The new category object in the response body.
   */
  async postCategory(request, response) {
    const newCategory = await dataMapper.postCategory(request.body);
    response.json(newCategory.rows);
  },

  /**
   * plant API controller for POST /alliances
   * Create a new alliance
   *
   * @param {object} request - Contains the body with alliance information
   * @param {object} response
   * @returns {object} - The new alliance object in the response body.
   */
  async postAlliance(request, response) {
    const newAlliance = await dataMapper.postAlliance(request.body);
    response.json(newAlliance.rows);
  },
};

module.exports = plantController;
