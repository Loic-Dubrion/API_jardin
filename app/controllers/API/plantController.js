const dataMapper = require('../../models/plantDataMapper');

const plantController = {
  /**
   * cadex API controller for GET /plants
   *
   * @param {object} request
   * @param {object} response
   */
  async getAllPlants(request, response) {
    const result = await dataMapper.getAllPlants();
    if (!result || !result.rows || result.rows.length === 0) {
      // throw new OblogError('Aucune réponse du serveur', 503); // 503 Service Unavailable
    }
    response.json(result.rows);
  },

};

module.exports = plantController;
