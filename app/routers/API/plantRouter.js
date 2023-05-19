const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/helpers/controllerHandler');
const plantController = require('../../controllers/API/plantController');

//! ROUTER GET
/** GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Plants - The plants
 * @description
 * This route returns all the information relating to plants
 * @return {Plant} 200 - success response
 * @return {error} 500 - internal server error
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
 * @return {Plant} 200 - success response - user's profile information
 * @return {error} 404 - Plant not found error
 * @return {error} 500 - internal server error
 */
router.get('/:plantId', controllerHandler(plantController.getOnePlant));

//! ROUTER POST
/** POST /api/plants/
 *
 * @summary Creates a new plant
 * @tags Plants - Everything about Plants
 * @description
 * This route creates a new plant.
 * @param {object} plant.body.required - Plant info {name: string, specification: array,
 * culture_advice: array, id_family: int, id_category: int}
 * @return {Plant} 201 - success response - plant information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post('/', controllerHandler(plantController.postPlant));

/** POST /api/plants/categories
 *
 * @summary Creates a new category for plants
 * @tags Plants - Everything about Plants
 * @description
 * This route creates a new plant category.
 * @param {object} category.body.required - Category info {name: string}
 * @return {Category} 201 - success response - category information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post('/categories', controllerHandler(plantController.postCategory));

/** POST /api/plants/families
 *
 * @summary Creates a new family for plants
 * @tags Plants - Everything about Plants
 * @description
 * This route creates a new plant family.
 * @param {object} family.body.required - Family info {name: string, id_alliance: int}
 * @return {Family} 201 - success response - family information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post('/families', controllerHandler(plantController.postFamily));

/** POST /api/plants/alliance
 *
 * @summary Creates a new alliance for plants
 * @tags Plants - Everything about Plants
 * @description
 * This route creates a new plant alliance.
 * @param {object} alliance.body.required - Alliance info {name: string}
 * @return {Alliance} 201 - success response - alliance information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post('/alliance', controllerHandler(plantController.postAlliance));

//! ROUTER PUT
/** PUT /api/plants/{plantId}
 *
 * @summary Update a plant with new information
 * @tags Plants - Updating plant information
 * @description
 * This route allows for the updating of a plant's information
 * @bodyContent {Plant} application/json
 * @bodyRequired
 * @return {Plant} 200 - success response - updated plant information
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
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
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
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
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
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
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.put('/alliances/:allianceId', controllerHandler(plantController.updateAlliance));

//! ROUTER DELETE
/** DELETE /api/plants/{plantId}
 *
 * @summary Delete a plant
 * @tags Plants - Deleting plant information
 * @description
 * This route allows for the deletion of a plant
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete('/:plantId', controllerHandler(plantController.deletePlant));

/** DELETE /api/plants/categories/{categoryId}
 *
 * @summary Delete a category
 * @tags Plants - Deleting category information
 * @description
 * This route allows for the deletion of a category
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete('/categories/:categoryId', controllerHandler(plantController.deleteCategory));

/** DELETE /api/plants/families/{familyId}
 *
 * @summary Delete a family
 * @tags Plants - Deleting family information
 * @description
 * This route allows for the deletion of a family
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete('/families/:familyId', controllerHandler(plantController.deleteFamily));

/** DELETE /api/plants/alliances/{allianceId}
 *
 * @summary Delete an alliance
 * @tags Plants - Deleting alliance information
 * @description
 * This route allows for the deletion of an alliance
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete('/alliances/:allianceId', controllerHandler(plantController.deleteAlliance));

module.exports = router;
