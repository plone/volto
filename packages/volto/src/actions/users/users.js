/**
 * Users actions.
 * @module actions/users/users
 */

import { stringify } from 'query-string';

import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  INITIAL_PASSWORD,
  LIST_USERS,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  UPDATE_USER,
} from '@plone/volto/constants/ActionTypes';

/**
 * Create user function.
 * @function createUser
 * @param {Object|Array} content User data.
 * @returns {Object} Create user action.
 */
export function createUser(content, sendPasswordReset = null) {
  return {
    type: CREATE_USER,
    request: {
      op: 'post',
      path: '/@users',
      data: sendPasswordReset ? { ...content, sendPasswordReset } : content,
    },
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
    request: {
      op: 'del',
      path: `/@users/${id}`,
    },
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
    request: {
      op: 'get',
      path: `/@users/${id}`,
    },
  };
}

/**
 * List users function
 * 'query' and 'search' are mutually exclusive parameters. 'search' wins.
 * Query either for username or search for username, fullname, email.
 * @function listUsers
 * @param {string} query for username
 * @param {string} search for  username, fullname, email.
 * @param {list} groups_filter restrict to group membership
 * @param {int} limit
 * @returns {Object} List users action
 */
export function listUsers(options = {}) {
  const { query = '', search = '', groups_filter = [], limit = null } = options;
  let path = '/@users';

  var searchParams = new URLSearchParams();
  if (query) {
    searchParams.append('query', query);
  }
  if (search) {
    searchParams.append('search', search);
  }
  limit && searchParams.append('limit', limit);
  const searchParamsToString = searchParams.toString();

  let filterarg =
    groups_filter.length > 0
      ? stringify(
          { 'groups-filter': groups_filter },
          { arrayFormat: 'colon-list-separator' },
        )
      : '';

  if (searchParamsToString) {
    path += `?${searchParamsToString}`;
  }
  if (filterarg) {
    path += searchParamsToString ? '&' : '?';
    path += filterarg;
  }
  return {
    type: LIST_USERS,
    request: {
      op: 'get',
      path: path,
    },
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
    request: { op: 'patch', path: `/@users/${id}`, data: user },
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
    request: {
      op: 'post',
      path: `/@users/${id}/reset-password`,
      data: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    },
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
    request: {
      op: 'post',
      path: `/@users/${id}/reset-password`,
      data: {
        reset_token: token,
        new_password: newPassword,
      },
    },
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
    request: {
      op: 'post',
      path: `/@users/${id}/reset-password`,
    },
  };
}
