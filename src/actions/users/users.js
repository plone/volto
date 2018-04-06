/**
 * Users actions.
 * @module actions/users/users
 */

import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  EDIT_USER,
  EDIT_PASSWORD,
  INITIAL_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes';

/**
 * Add user function.
 * @function addUser
 * @param {Object|Array} content User data.
 * @returns {Object} Add user action.
 */
export function addUser(content) {
  return {
    type: ADD_USER,
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
 * Get users function
 * @function getUsers
 * @param {string} query Query
 * @returns {Object} Get users action
 */
export function getUsers(query) {
  return {
    type: GET_USERS,
    promise: query
      ? api => api.get(`/@users?query=${query}`)
      : api => api.get('/@users'),
  };
}

/**
 * Edit user function
 * @function editUser
 * @param {string} id User id
 * @param {Object} user User data.
 * @returns {Object} Edit user action.
 */
export function editUser(id, user) {
  return {
    type: EDIT_USER,
    promise: api => api.patch(`/@users/${id}`, { data: user }),
  };
}

/**
 * Edit password function
 * @function editPassword
 * @param {string} id User id
 * @param {string} oldPassword Old password.
 * @param {string} newPassword New password.
 * @returns {Object} Edit password action.
 */
export function editPassword(id, oldPassword, newPassword) {
  return {
    type: EDIT_PASSWORD,
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
