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

router.post('/', controllerHandler(plantController.postPlant));
router.post('/categories', controllerHandler(plantController.postCategory));
router.post('/families', controllerHandler(plantController.postFamily));
router.post('/alliance', controllerHandler(plantController.postAlliance));

/** PUT /api/plants/{plantId}
 *
 * @summary Update a plant with new information
 * @tags Plants - Updating plant information
 * @description
 * This route allows for the updating of a plant's information
 * @bodyContent {Plant} application/json
 * @bodyRequired
 * @return {Plant} 200 - success response - updated plant information
 * @return {object} 400 - Bad request error
 * @return {object} 500 - internal server error
 */
router.put('/:plantId', controllerHandler(plantController.updatePlant));

/** PUT /api/plants/categories/{categoryId}
 *
 * @summary Update a category with new information
 * @tags Plants - Updating category information
 * @description
 * This route allows for the updating of a category's information
 * @bodyContent {Category} application/json
 * @bodyRequired
 * @return {Category} 200 - success response - updated category information
 * @return {object} 400 - Bad request error
 * @return {object} 500 - internal server error
 */
router.put('/categories/:categoryId', controllerHandler(plantController.updateCategory));

/** PUT /api/plants/families/{familyId}
 *
 * @summary Update a family with new information
 * @tags Plants - Updating family information
 * @description
 * This route allows for the updating of a family's information
 * @bodyContent {Family} application/json
 * @bodyRequired
 * @return {Family} 200 - success response - updated family information
 * @return {object} 400 - Bad request error
 * @return {object} 500 - internal server error
 */
router.put('/families/:familyId', controllerHandler(plantController.updateFamily));

/** PUT /api/plants/alliances/{allianceId}
 *
 * @summary Update an alliance with new information
 * @tags Plants - Updating alliance information
 * @description
 * This route allows for the updating of an alliance's information
 * @bodyContent {Alliance} application/json
 * @bodyRequired
 * @return {Alliance} 200 - success response - updated alliance information
 * @return {object} 400 - Bad request error
 * @return {object} 500 - internal server error
 */
router.put('/alliances/:allianceId', controllerHandler(plantController.updateAlliance));

module.exports = router;
