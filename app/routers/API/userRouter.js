const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/helpers/controllerHandler');
const userController = require('../../controllers/API/userController');

/** a user type
 * @typedef {object} User
 * @property {number} id - user id
 * @property {string} username - user name
 * @property {string} email - user email
 * @property {number} id_role - user role id
 * @property {number} total_plots - total number of plots the user has
 */

/** a culture type
 * @typedef {object} Culture
 * @property {string} username - Username of the user
 * @property {number} plot_id - ID of the plot
 * @property {string} name - Name of the plot
 * @property {boolean} availability - Availability status of the plot
 * @property {number} family_id - id of the family
 * @property {string} family - Family name of the plant
 * @property {string} variety - Variety name of the plant
 * @property {string} category - Category name of the plant
 * @property {string} sowing - Sowing date of the culture
 * @property {string} planting - Planting date of the culture
 * @property {string} harvesting - Harvesting date of the culture
 * @property {string} comment - Comment for the culture
 */

/** a categories type
 * @typedef {object} Categories
 * @property {string} plot_name - The name of the plot
 * @property {string[]} three_last_culture - Array of 'category, family, harvesting'
 */

//! ==================//
//! ===== GETS ===== //
//! ==================//

/** GET /api/users/{userId}
 *
 * @summary Get profile information of a specific user
 * @tags Users - Everything about Users
 * @description
 * This route retrieves the profile information of a user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to fetch
 * @return {User} 200 - success response - user's profile information
 * @return {object} 404 - User not found error
 * @return {object} 500 - internal server error
 */

router.get(
  '/:userId',
  controllerHandler(userController.getProfil),
);

/** GET /api/users/{userId}/cultures/in-progress
 *
 * @summary Get in-progress cultures of a specific user
 * @tags Users
 * @description
 * This route retrieves the in-progress cultures of a specific user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @return {Culture} 200 - success response - array of in-progress cultures
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get('/:userId/cultures/in-progress', (req, res) => controllerHandler(userController.getProduction(req, res, true)));

/** GET /api/users/{userId}/cultures/completed
 *
 * @summary Get completed cultures of a specific user
 * @tags Users
 * @description
 * This route retrieves the completed cultures of a specific user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @return {Culture} 200 - success response - array of completed cultures
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get('/:userId/cultures/completed', (req, res) => controllerHandler(userController.getProduction(req, res, false)));

/** GET /api/users/{userId}/cultures/plots/{plotId}
 *
 * @summary Get cultures of a specific user for a particular plot
 * @tags Users
 * @description
 * This route retrieves the cultures of a specific user for a particular plot.
 * The user's ID and plot ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot
 * @return {Culture} 200 - success response - array of cultures for the plot
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get('/:userId/cultures/plots/:plotId', (req, res) => controllerHandler(userController.getProduction(req, res, true, req.params.plotId)));

/** GET /api/users/{userId}/cultures/{cultureId}
 *
 * @summary Get details of a specific culture of a user
 * @tags Users
 * @description
 * This route retrieves the details of a specific culture of a user.
 * The user's ID and culture ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} cultureId.path - ID of the culture
 * @return {Culture} 200 - success response - details of the culture
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get('/:userId/cultures/:cultureId', (req, res) => controllerHandler(userController.getProduction(req, res, true, null, req.params.cultureId)));

/** GET /api/users/{userId}/cultures/plots/{plotId}/last-cultures
 *
 * @summary Get the last three categories of culture
 * @tags Users
 * @description
 * This route retrieves the last three categories of one plot.
 * The user's ID and plot ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot
 * @return {Categories} 200 - success response - details of the last categories
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get(
  '/:userId/cultures/plots/:plotId/last-cultures',
  controllerHandler(userController.getLastCategories),
);

/** GET /api/users/{userId}/plots/{plotId}/alliances
 *
 * @summary Get the list of possible plants for this plot
 * @tags Users
 * @description
 * This route retrieves the list of possible plants for this plot.
 * The user's ID and plot ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot
 * @return {Categories} 200 - success response - details of the last categories
 * @return {object} 404 - Ressource not found error
 * @return {object} 500 - internal server error
 */
router.get(
  '/:userId/plots/:plotId/alliances',
  controllerHandler(userController.getAlliancesForPlot),
);

//! ==================//
//! ===== POSTS ===== //
//! ==================//
router.post(
  '/:userId/plots',
  controllerHandler(userController.insertPlot),
);

router.post(
  '/:userId/cultures',
  controllerHandler(userController.insertCulture),
);

module.exports = router;
