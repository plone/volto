/**
 * Users actions.
 * @module actions/users/users
 */

import {
  GET_USER,
  EDIT_USER,
  EDIT_PASSWORD,
} from '../../constants/ActionTypes';

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
