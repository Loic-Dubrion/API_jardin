const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/helpers/controllerHandler');
const plantController = require('../../controllers/API/plantController');

/**
 * a plant type
 *
 * @typedef {object} Plant
 * @property {number} id - plant id
 * @property {string} name - text slug
 * @property {array} specification - plant specification
 * @property {array} culture_advice - plant culture_advice
 * @property {string} category - plant category
 * @property {string} familly - plant familly
 * @property {array} alliance - alliance's plant
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

module.exports = router;
