/**
 * @module types
 */

/**
 * a plant type
 *
 * @typedef {object} Plant
 * @property {number} id - plant id
 * @property {string} name - plant name
 * @property {object[]} specification - plant specification
 * @property {object[]} culture_advice - plant culture advice
 * @property {string} category - plant category name
 * @property {string} familly - plant familly name
 * @property {object[]} alliance - Allied plant family list
 */

/**
 * a category type
 *
 * @typedef {object} Category
 * @property {number} id - category id
 * @property {string} name - category name
 */

/**
 * a family type
 *
 * @typedef {object} Family
 * @property {number} id - category id
 * @property {string} name - category name
 */

/**
 * a alliance type
 *
 * @typedef {object} Alliance
 * @property {number} id - category id
 * @property {object[]} alliance - array of alliances family names
 */

/**
 * a error type
 *
 * @typedef {object} Error
 * @property {number} status - HTTP status code of the error
 * @property {string} error - HTTP error message
 * @property {string} message - Detailed error message
 */

/**
 * a sucess response type
 *
 * @typedef {object} SuccessResponse
 * @property {number} status - Status code of the response
 * @property {string} message - Success message
 * @property {number} id - Identifier of the deleted entity
 */

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
