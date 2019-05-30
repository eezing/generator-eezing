'use strict';

/**
 * Get user details.
 * @param {String} id - Requested user id.
 * @param {Object} user - Hydrated session user.
 * @returns {Object} User details.
 */
module.exports = (id, user) => {
  // Authorization: Requested user id must match session user id.
  if (id !== user.id) return null;

  return {
    id: user.id,
    tenant_id: user.tenant_id,
    name: user.name
  };
};
