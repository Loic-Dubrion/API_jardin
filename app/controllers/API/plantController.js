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
};

module.exports = plantController;
