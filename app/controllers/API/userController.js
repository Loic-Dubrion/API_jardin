const dataMapper = require('../../models/userDataMapper');

const userController = {
  //! Controller for Reading
  /**
   * Get profile information of a specific user
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

  /**
   * Get production details based on specified filters
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @param {boolean} isHarvestingNull - Flag indicating whether the harvesting date is null or not
   * @param {number|null} plotId - ID of the plot to filter by (optional)
   * @param {number|null} cultureId - ID of the culture to filter by (optional)
   * @returns {void}
   */
  async getProduction(request, response, isHarvestingNull, plotIdParam = null, cultIdParam = null) {
    const userId = Number(request.params.userId);
    const plotId = plotIdParam ? Number(request.params.plotId) : null;
    const cultureId = cultIdParam ? Number(request.params.cultureId) : null;
    const result = await dataMapper.getProduction(userId, isHarvestingNull, plotId, cultureId);
    if (result.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No production found with these parameters.' });
    } else {
      response.json(result.rows);
    }
  },

  /**
   * Get the last three categories
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @returns {void}
   */
  async getLastCategories(request, response) {
    const plotId = Number(request.params.plotId);
    const result = await dataMapper.getLastCultures(plotId);
    if (result.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No ressource found with this ID.' });
    } else {
      response.json(result.rows);
    }
  },

  /**
   * Get all the alliances for the plants in a specific plot
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @returns {void}
   */
  async getAlliancesForPlot(request, response) {
    const plotId = Number(request.params.plotId);
    const userId = Number(request.params.userId);
    // Call to datamapper.Getproduction to obtain the families of plants from the plot
    const plantFamilies = await dataMapper.getProduction(userId, true, plotId);

    if (plantFamilies.rows.length === 0) {
      response.status(404).json({ status: 404, error: 'No plants in the plot, no alliance.' });
    } else {
      // Sinon, on va chercher les alliances pour chaque famille de plantes.
      // Chaque demande d'alliance est asynchrone, on utilise donc Promise.all
      // "then" retourne un objet qui contient le nom de la famille de plantes et son alliance
      const alliancePromises = plantFamilies.rows.map(
        (plantFamily) => dataMapper.getAlliance(plantFamily.family_id).then((alliance) => ({
          family_name: plantFamily.family_name,
          alliance: alliance.rows.length > 0 ? alliance.rows[0] : {},
        })),
      );

      const alliances = await Promise.all(alliancePromises);
      // Reduces the table of objects into a single object where the keys are family names
      // and values are the associated alliances
      const results = alliances.reduce((acc, { familyName, alliance }) => {
        acc[familyName] = alliance;
        return acc;
      }, {});

      if (Object.keys(results).length === 0) {
        response.status(404).json({ status: 404, error: 'No alliances found for the plant family.' });
      } else {
        response.json(results);
      }
    }
  },

  //! Controller for Creating
  /**
   * Inserts a new plot in the database.
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @returns {void} - This function does not return anything.
   *                   It ends the request-response cycle by sending a response to the client.
   *                   Sends a 201 status code along with the details if the operation is successful
   *                   or a 400 status code along with an error message if it is not.
   */
  async insertPlot(request, response) {
    const newPlot = await dataMapper.insertPlot(request.body);
    if (newPlot.rows.length > 0) {
      response.status(201).json(newPlot.rows[0]);
    } else {
      response.status(400).json({ error: 'Could not insert Plot.' });
    }
  },

  /**
 * Inserts a new culture in the database.
 *
 * @param {object} request - The request object
 * @param {object} response - The response object
 * @returns {void} - This function does not return anything.
 *                   It ends the request-response cycle by sending a response to the client.
 *                   Sends a 201 status code along with the details if the operation is successful,
 *                   or a 400 status code along with an error message if it is not.
 */
  async insertCulture(request, response) {
    const newCulture = await dataMapper.insertCulture(request.body);
    if (newCulture.rows.length > 0) {
      response.status(201).json(newCulture.rows[0]);
    } else {
      response.status(400).json({ error: 'Could not insert culture.' });
    }
  },

  //! Controller for Updating

};

module.exports = userController;
