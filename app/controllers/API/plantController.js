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
    response.json(result.rows);
  },
};

module.exports = plantController;
