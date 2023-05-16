const dataMapper = require('../../models/userDataMapper');

const userController = {

  /** Get profile information of a specific user
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @returns {void}
   */
  async getProfil(request, response) {
    const userId = Number(request.params.userId);
    const result = await dataMapper.getProfil(userId);
    if (result.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No user found with this ID.' });
    } else {
      response.json(result.rows);
    }
  },

  /** Get production details based on specified filters
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @param {boolean} isHarvestingNull - Flag indicating whether the harvesting date is null or not
   * @param {number|null} plotId - ID of the plot to filter by (optional)
   * @param {number|null} cultureId - ID of the culture to filter by (optional)
   * @returns {void}
   */
  async getProduction(request, response, isHarvestingNull, plotId = null, cultureId = null) {
    const userId = Number(request.params.userId);
    plotId = plotId ? Number(request.params.plotId) : null;
    cultureId = cultureId ? Number(request.params.cultureId) : null;
    const result = await dataMapper.getProduction(userId, isHarvestingNull, plotId, cultureId);
    if (result.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No production found with these parameters.' });
    } else {
      response.json(result.rows);
    }
  },
};

module.exports = userController;
