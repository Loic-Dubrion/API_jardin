const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/helpers/controllerHandler');
const userController = require('../../controllers/API/userController');

//!  GET
/** GET /api/users/{userId}
 *
 * @summary Get profile information of a specific user
 * @tags Users - Everything about Users
 * @description
 * This route retrieves the profile information of a user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to fetch
 * @return {User} 200 - success response - user's profile information
 * @return {error} 404 - User not found error
 * @return {error} 500 - internal server error
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
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/cultures/in-progress',
  (req, res) => controllerHandler(userController.getProduction(req, res, true)),
);

/** GET /api/users/{userId}/cultures/completed
 *
 * @summary Get completed cultures of a specific user
 * @tags Users
 * @description
 * This route retrieves the completed cultures of a specific user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @return {Culture} 200 - success response - array of completed cultures
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/cultures/completed',
  (req, res) => controllerHandler(userController.getProduction(req, res, false)),
);

/** GET /api/users/{userId}/plots/{plotId}
 *
 * @summary Get cultures of a specific user for a particular plot
 * @tags Users
 * @description
 * This route retrieves the cultures of a specific user for a particular plot.
 * The user's ID and plot ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot
 * @return {Culture} 200 - success response - array of cultures for the plot
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/plots/:plotId',
  (req, res) => controllerHandler(userController.getProduction(req, res, true, req.params.plotId)),
);

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
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/cultures/:cultureId',
  (req, res) => controllerHandler(userController.getProduction(req, res, true, null, req.params.cultureId)),
);

/** GET /api/users/{userId}/plots/{plotId}/last-cultures
 *
 * @summary Get the last three categories of culture
 * @tags Users
 * @description
 * This route retrieves the last three categories of one plot.
 * The user's ID and plot ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot
 * @return {Categories} 200 - success response - details of the last categories
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/plots/:plotId/last-cultures',
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
 * @return {error} 404 - Ressource not found error
 * @return {error} 500 - internal server error
 */
router.get(
  '/:userId/plots/:plotId/alliances',
  controllerHandler(userController.getAlliancesForPlot),
);

//! POST
/** POST /api/users/{userId}/plots
 *
 * @summary Creates a new plot for a specific user
 * @tags Users - Everything about Users
 * @description
 * This route creates a new plot for a user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to create plot for
 * @param {object} plot.body.required - Plot info {name: string, availability: boolean}
 * @return {Plot} 201 - success response - plot information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post(
  '/:userId/plots',
  controllerHandler(userController.insertPlot),
);

/** POST /api/users/{userId}/plots/1/cultures
 *
 * @summary Creates a new culture for a specific user
 * @tags Users - Everything about Users
 * @description
 * This route creates a new culture for a user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to create culture for
 * @param {object} culture.body.required - Culture info {sowing: date, planting: date,
 *  harvesting: date, id_plant: int, id_plot: int, comment: string}
 * @return {Culture} 201 - success response - culture information
 * @return {error} 400 - Bad request response
 * @return {error} 500 - internal server error
 */
router.post(
  '/:userId/plots/:plotId/cultures',
  controllerHandler(userController.insertCulture),
);

//! PUT
/** PUT /api/users/{userId}
 *
 * @summary Update profile information of a specific user
 * @tags Users - Everything about Users
 * @description
 * This route updates the profile information of a user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to update
 * @return {User} 200 - success response - updated user's profile information
 * @return {error} 404 - User not found error
 * @return {error} 500 - internal server error
 */
router.put(
  '/:userId',
  controllerHandler(userController.updateUser),
);

/** PUT /api/users/{userId}/plots/{plotId}
 *
 * @summary Update a specific plot information
 * @tags Users - Everything about Plots
 * @description
 * This route updates the information of a plot.
 * The user's ID and the plot's ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot to update
 * @return {Plot} 200 - success response - updated plot information
 * @return {error} 404 - Plot not found error
 * @return {error} 500 - internal server error
 */
router.put(
  '/:userId/plots/:plotId',
  controllerHandler(userController.updatePlot),
);

/** PUT /api/users/{userId}/cultures/{cultureId}
 *
 * @summary Update a specific culture information
 * @tags Users - Everything about Cultures
 * @description
 * This route updates the information of a culture.
 * The user's ID and the culture's ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} cultureId.path - ID of the culture to update
 * @return {Culture} 200 - success response - updated culture information
 * @return {error} 404 - Culture not found error
 * @return {error} 500 - internal server error
 */
router.put(
  '/:userId/cultures/:cultureId',
  controllerHandler(userController.updateCulture),
);

//! ==================//
//! ===== DELETE ==== //
//! ==================//

/** DELETE /api/users/{userId}
 *
 * @summary Delete a specific user and all related plots and cultures
 * @tags Users - Everything about Users
 * @description
 * This route deletes a user and all the plots and cultures related to this user.
 * The user's ID is expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user to delete
 * @return {SuccessResponse} 200 - success response - successful deletion message
 * @return {error} 404 - User not found error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/:userId',
  controllerHandler(userController.deleteUser),
);

/** DELETE /api/users/{userId}/plots/{plotId}
 *
 * @summary Delete a specific plot and all related cultures
 * @tags Users - Everything about Plots
 * @description
 * This route deletes a plot and all the cultures related to this plot.
 * The user's ID and the plot's ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} plotId.path - ID of the plot to delete
 * @return {SuccessResponse} 200 - success response - successful deletion message
 * @return {error} 404 - Plot not found error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/:userId/plots/:plotId',
  controllerHandler(userController.deletePlot),
);

/** DELETE /api/users/{userId}/cultures/{cultureId}
 *
 * @summary Delete a specific culture
 * @tags Users - Everything about Cultures
 * @description
 * This route deletes a culture.
 * The user's ID and the culture's ID are expected to be included in the request parameters.
 * @param {number} userId.path - ID of the user
 * @param {number} cultureId.path - ID of the culture to delete
 * @return {SuccessResponse} 200 - success response - successful deletion message
 * @return {error} 404 - Culture not found error
 * @return {error} 500 - internal server error
 */
router.delete(
  '/:userId/cultures/:cultureId',
  controllerHandler(userController.deleteCulture),
);

module.exports = router;
