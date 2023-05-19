const dataMapper = require('../../models/plantDataMapper');

const plantController = {
  //! Controller for Reading
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
      response.status(404).json({
        status: 404,
        error: 'Not Found',
        message: 'No plant found with these parameters.',
      });
    } else {
      response.json(result.rows);
    }
    response.json(result.rows);
  },

  //! Controller for Creating
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
    if (newPlant.rows.length > 0) {
      response.status(201).json(newPlant.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not insert lant.' });
    }
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
    if (newFamily.rows.length > 0) {
      response.status(201).json(newFamily.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not insert family.' });
    }
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
    if (newCategory.rows.length > 0) {
      response.status(201).json(newCategory.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not insert caregory.' });
    }
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
    if (newAlliance.rows.length > 0) {
      response.status(201).json(newAlliance.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not insert Alliance.' });
    }
  },

  //! Controller for Updating
  /**
   * plant API controller for PUT /plants/{plantId}
   * Update a plant
   *
   * @param {object} request - Contains the body with plant information and the plant id
   * @param {object} response
   * @returns {object} - The updated plant object in the response body.
   */
  async updatePlant(request, response) {
    const updatedPlant = await dataMapper.updatePlant(request.body, request.params.plantId);
    if (updatedPlant.rows.length > 0) {
      response.status(200).json(updatedPlant.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not update plant.' });
    }
  },

  /**
     * family API controller for PUT /families/{familyId}
     * Update a family
     *
     * @param {object} request - Contains the body with family information and the family id
     * @param {object} response
     * @returns {object} - The updated family object in the response body.
     */
  async updateFamily(request, response) {
    const updatedFamily = await dataMapper.updateFamily(request.body, request.params.familyId);
    if (updatedFamily.rows.length > 0) {
      response.status(200).json(updatedFamily.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not update family.' });
    }
  },

  /**
     * category API controller for PUT /categories/{categoryId}
     * Update a category
     *
     * @param {object} request - Contains the body with category information and the category id
     * @param {object} response
     * @returns {object} - The updated category object in the response body.
     */
  async updateCategory(request, response) {
    const updatedCategory = await dataMapper.updateCategory(request.body, request.params.categoryId);
    if (updatedCategory.rows.length > 0) {
      response.status(200).json(updatedCategory.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not update category.' });
    }
  },

  /**
     * alliance API controller for PUT /alliances/{allianceId}
     * Update an alliance
     *
     * @param {object} request - Contains the body with alliance information and the alliance id
     * @param {object} response
     * @returns {object} - The updated alliance object in the response body.
     */
  async updateAlliance(request, response) {
    const updatedAlliance = await dataMapper.updateAlliance(request.body, request.params.allianceId);
    if (updatedAlliance.rows.length > 0) {
      response.status(200).json(updatedAlliance.rows[0]);
    } else {
      response.status(400).json({ status: 404, error: 'Bad Request', message: 'Could not update alliance.' });
    }
  },

  //! Controller for Delete
  /**
   * Delete a plant
   *
   * @param {object} request - Contains the plant id in the request parameters
   * @param {object} response
   */
  async deletePlant(request, response) {
    await dataMapper.deletePlant(request.params.plantId);
    response.status(200).json({
      message: `Plant with ID ${request.params.plantId} has been successfully deleted.`,
    });
  },

  /**
 * Delete a family
 *
 * @param {object} request - Contains the family id in the request parameters
 * @param {object} response
 */
  async deleteFamily(request, response) {
    await dataMapper.deleteFamily(request.params.familyId);
    response.status(200).json({
      message: `Family with ID ${request.params.familyId} has been successfully deleted.`,
    });
  },

  /**
 * Delete a category
 *
 * @param {object} request - Contains the category id in the request parameters
 * @param {object} response
 */
  async deleteCategory(request, response) {
    await dataMapper.deleteCategory(request.params.categoryId);
    response.status(200).json({
      message: `Category with ID ${request.params.categoryId} has been successfully deleted.`,
    });
  },

  /**
 * Delete an alliance
 *
 * @param {object} request - Contains the alliance id in the request parameters
 * @param {object} response
 */
  async deleteAlliance(request, response) {
    await dataMapper.deleteAlliance(request.params.allianceId);
    response.status(200).json({
      message: `Alliance with ID ${request.params.allianceId} has been successfully deleted.`,
    });
  },
};

module.exports = plantController;
