const express = require('express');

const router = express.Router();

const isAdmin = require('../../helpers/isAdmin');
const validateParam = require('../../helpers/validateParam');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const plantController = require('../../controllers/API/plantController');

const validate = require('../../validations/validate');
const { plantBody } = require('../../validations/schemas');

router.param('plantId', validateParam('plantId'));
router.param('categoryId', validateParam('categoryId'));
router.param('familyId', validateParam('familyId'));
router.param('allianceId', validateParam('allianceId'));
router.use('/', isAdmin);

/**
 * @swagger
 * tags:
 *   name: Plants
 */

//! ROUTER GET
/** GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Plants - All operations related to plants
 * @description
 * This route returns all the information relating to plants
 * @return {Plant} 200 - success response
 * @return {Error} 500 - internal server error
 */
router.get('/', controllerHandler(plantController.getAllPlants));

/** GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Families
 * @description
 * This route returns all families
 * @return {Plant} 200 - success response
 * @return {Error} 500 - internal server error
 */
router.get('/families', controllerHandler(plantController.getFamilies));

/** GET /api/plants
 *
 * @summary get all plants with category, familly and alliance
 * @tags Categories
 * @description
 * This route returns all categories
 * @return {Plant} 200 - success response
 * @return {Error} 500 - internal server error
 */
router.get('/categories', controllerHandler(plantController.getCategories));

/** GET /api/plants/{plantId}
 *
 * @summary Get all plants with category, familly and alliance
 * @tags Plants
 * @description
 * This route returns all the information relating to a plant
 * The plant's ID is expected to be included in the request parameters.
 * @param {number} plantId.path - ID of the user to fetch
 * @return {Plant} 200 - success response - user's profile information
 * @return {error} 404 - Plant not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:plantId',
  controllerHandler(plantController.getOnePlant),
);

//! ROUTER POST
/** POST /api/plants/
 *
 * @summary Creates a new plant
 * @tags Plants
 * @description
 * This route creates a new plant.
 * @bodyRequired
 * @param {string} requestBody.name.required - name of the plant
 * @param {array} requestBody.specification - specification of the plant
 * @param {array} requestBody.culture_advice - culture advice for the plant
 * @param {number} requestBody.id_family.required - id family of the plant
 * @param {number} requestBody.id_category.required - id family of the plant
 *
 * @return {Plant} 201 - success response - plant information
 * @return {Error} 400 - Bad request response
 * @return {Error} 500 - internal server error
 */
router.post('/', validate(plantBody, 'body'), controllerHandler(plantController.postPlant));

/** POST /api/plants/categories
 *
 * @summary Creates a new category for plants
 * @tags Categories - All operations related to plant categories
 * @description
 * This route creates a new plant category.
 * @bodyRequired
 * @param {string} requestBody.name.required - name of the category
 *
 * @return {Category} 201 - success response - category information
 * @return {Error} 400 - Bad request response
 * @return {Error} 500 - internal server error
 */
router.post('/categories', controllerHandler(plantController.postCategory));

/** POST /api/plants/families *
 * @summary Creates a new family for plants
 * @tags Families - All operations related to plant families
 * @description
 * This route creates a new plant family.
 * @bodyRequired
 * @param {string} requestBody.name.required - name of the category
 *
 * @return {Family} 201 - success response - family information
 * @return {Error} 400 - Bad request response
 * @return {Error} 500 - internal server error
 */
router.post('/families', controllerHandler(plantController.postFamily));

/** POST /api/plants/alliance
 *
 * @summary Creates a new alliance for plants
 * @tags Alliances - All operations related to plant alliances
 * @description
 * This route creates a new plant alliance.
 * @bodyRequired
 * @param {array} requestBody.id_family.required - array of id families
 *
 * @return {Alliance} 201 - success response - alliance information
 * @return {Error} 400 - Bad request response
 * @return {Error} 500 - internal server error
 */
router.post('/alliances', controllerHandler(plantController.postAlliance));

//! ROUTER PUT
/** PUT /api/plants/{plantId}
 *
 * @summary Update a plant with new information
 * @tags Plants
 * @description
 * This route allows for the updating of a plant's information
 * @param {number} plantId.path.required - ID of the plant to update (required)
 *
 * @bodyRequired
 * @param {string} requestBody.name - name of the plant
 * @param {array} requestBody.specification - specification of the plant
 * @param {array} requestBody.culture_advice - culture advice for the plant
 * @param {number} requestBody.id_family - id family of the plant
 * @param {number} requestBody.id_category - id family of the plant
 *
 * @return {Plant} 200 - success response - updated plant information
 * @return {Error} 400 - Bad request error
 * @return {Error} 500 - internal server error
 */
router.put(
  '/:plantId',
  validate(plantBody, 'body'),
  controllerHandler(plantController.updatePlant),
);

/** PUT /api/plants/categories/{categoryId}
 *
 * @summary Update a category with new information
 * @tags Categories
 * @description
 * This route allows for the updating of a category's information
 * @param {number} categoryId.path.required - ID of the category to update
 *
 * @bodyRequired
 * @param {string} requestBody.name - name of the category
 *
 * @return {Category} 200 - success response - updated category information
 * @return {Error} 400 - Bad request error
 * @return {Error} 500 - internal server error
 */
router.put(
  '/categories/:categoryId',
  controllerHandler(plantController.updateCategory),
);

/** PUT /api/plants/families/{familyId}
 *
 * @summary Update a family with new information
 * @tags Families
 * @description
 * This route allows for the updating of a family's information
 * @param {number} familyId.path.required - ID of the family to update
 *
 * @bodyRequired
 * @param {string} requestBody.name - name of the family
 *
 * @return {Family} 200 - success response - updated family information
 * @return {Error} 400 - Bad request error
 * @return {Error} 500 - internal server error
 */
router.put(
  '/families/:familyId',
  controllerHandler(plantController.updateFamily),
);

/** PUT /api/plants/alliances/{allianceId}
 *
 * @summary Update an alliance with new information
 * @tags Alliances
 * @description
 * This route allows for the updating of an alliance's information
 * @param {number} allianceId.path.required - ID of the alliance to update
 *
 * @bodyRequired
 * @param {array} requestBody.name - array of id families
 *
 * @return {Alliance} 200 - success response - updated alliance information
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.put(
  '/alliances/:allianceId',
  controllerHandler(plantController.updateAlliance),
);

//! ROUTER DELETE
/** DELETE /api/plants/{plantId}
 *
 * @summary Delete a plant
 * @tags Plants
 * @description
 * This route allows for the deletion of a plant IF NO ASSOCIATED CULTURES EXIST
 * @param {number} plantId.path.required - ID of the plant to delete
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete('/:plantId', controllerHandler(plantController.deletePlant));

/** DELETE /api/plants/categories/{categoryId}
 *
 * @summary Delete a category IF NO ASSOCIATED PLANTS EXIST
 * @tags Categories
 * @description
 * This route allows for the deletion of a category
 * @param {number} categoryId.path.required - ID of the category to delete
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/categories/:categoryId',
  controllerHandler(plantController.deleteCategory),
);

/** DELETE /api/plants/families/{familyId}
 *
 * @summary Delete a family
 * @tags Families
 * @description
 * This route allows for the deletion of a family IF NO ASSOCIATED PLANTS EXIST
 * @param {number} familyId.path.required - ID of the family to delete
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/families/:familyId',
  controllerHandler(plantController.deleteFamily),
);

/** DELETE /api/plants/alliances/{allianceId}
 *
 * @summary Delete an alliance
 * @tags Alliances
 * @description
 * This route allows for the deletion of an allianceIF NO ASSOCIATED PLANTS EXIST
 * @param {number} allianceId.path.required - ID of the alliance to delete
 * @return {SuccessResponse} 200 - success response - confirmation of deletion
 * @return {error} 400 - Bad request error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/alliances/:allianceId',
  controllerHandler(plantController.deleteAlliance),
);

module.exports = router;
