'use strict';

const userGet = require('./userGet');

/**
 * Loader object for request.
 * @param {Object} user - Session user object.
 * @returns {Object} Request loader object.
 */
module.exports = () => ({
  userGet
});
