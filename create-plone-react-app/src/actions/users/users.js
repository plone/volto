/**
 * Users actions.
 * @module actions/users/users
 */

import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  LIST_USERS,
  UPDATE_USER,
  UPDATE_PASSWORD,
  INITIAL_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes';

/**
 * Create user function.
 * @function createUser
 * @param {Object|Array} content User data.
 * @returns {Object} Create user action.
 */
export function createUser(content) {
  return {
    type: CREATE_USER,
    promise: api => api.post('/@users', { data: content }),
  };
}

/**
 * Delete user function.
 * @function deleteUser
 * @param {string} id User id
 * @returns {Object} Delete user action.
 */
export function deleteUser(id) {
  return {
    type: DELETE_USER,
    promise: api => api.del(`/@users/${id}`),
  };
}

/**
 * Get user function
 * @function getUser
 * @param {string} id User id
 * @returns {Object} Get user action
 */
export function getUser(id) {
  return {
    type: GET_USER,
    promise: api => api.get(`/@users/${id}`),
  };
}

/**
 * List users function
 * @function listUsers
 * @param {string} query Query
 * @returns {Object} List users action
 */
export function listUsers(query) {
  return {
    type: LIST_USERS,
    promise: query
      ? api => api.get(`/@users?query=${query}`)
      : api => api.get('/@users'),
  };
}

/**
 * Update user function
 * @function updateUser
 * @param {string} id User id
 * @param {Object} user User data.
 * @returns {Object} Update user action.
 */
export function updateUser(id, user) {
  return {
    type: UPDATE_USER,
    promise: api => api.patch(`/@users/${id}`, { data: user }),
  };
}

/**
 * Update password function
 * @function updatePassword
 * @param {string} id User id
 * @param {string} oldPassword Old password.
 * @param {string} newPassword New password.
 * @returns {Object} Update password action.
 */
export function updatePassword(id, oldPassword, newPassword) {
  return {
    type: UPDATE_PASSWORD,
    promise: api =>
      api.post(`/@users/${id}/reset-password`, {
        data: {
          old_password: oldPassword,
          new_password: newPassword,
        },
      }),
  };
}

/**
 * Set initial password function
 * @function setInitialPassword
 * @param {string} id User id
 * @param {string} token One time user token.
 * @param {string} newPassword New password.
 * @returns {Object} Set initial password action.
 */
export function setInitialPassword(id, token, newPassword) {
  return {
    type: INITIAL_PASSWORD,
    promise: api =>
      api.post(`/@users/${id}/reset-password`, {
        data: {
          reset_token: token,
          new_password: newPassword,
        },
      }),
  };
}

/**
 * Reset password function
 * @function resetPassword
 * @param {string} id User id
 * @returns {Object} Reset password action.
 */
export function resetPassword(id) {
  return {
    type: RESET_PASSWORD,
    promise: api => api.post(`/@users/${id}/reset-password`),
  };
}
