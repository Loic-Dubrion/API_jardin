const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/helpers/controllerHandler');
const plantController = require('../../controllers/API/plantController');

/**
 * a plant type
 *
 * @typedef {object} Plant
 * @property {number} id - plant id
 * @property {string} name - plant name
 * @property {array} specification - plant specification
 * @property {array} culture_advice - plant culture advice
 * @property {string} category - plant category name
 * @property {string} familly - plant familly name
 * @property {array} alliance - Allied plant family list
 */

/** GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Plants - The plants
 * @description
 * This route returns all the information relating to plants
 * @return {array<Post>} 200 - success response
 * @return {object} 500 - internal server error
 */
router.get('/', controllerHandler(plantController.getAllPlants));

/** GET /api/plants/{plantId}
 *
 * @summary Get all plants with category, familly and alliance
 * @tags Plants - Everything about one plant
 * @description
 * This route returns all the information relating to a plant
 * The plant's ID is expected to be included in the request parameters.
 * @param {number} plantId.path - ID of the user to fetch
 * @return {User} 200 - success response - user's profile information
 * @return {object} 404 - Plant not found error
 * @return {object} 500 - internal server error
 */
router.get('/:plantId', controllerHandler(plantController.getOnePlant));

module.exports = router;
