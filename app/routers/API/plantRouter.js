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

/**
 * GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Plants - The plants
 *
 * @return {array<Post>} 200 - success response
 * @return {object} 500 - internal server error
 */
router.get('/', controllerHandler(plantController.getAllPlants));
router.get('/:plantId', controllerHandler(plantController.getOnePlant));

module.exports = router;
