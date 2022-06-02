import {
  GET_RULES,
  ENABLE_RULES,
  DISABLE_RULES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get rules function.
 * @function getRules
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getRules(url) {
  return {
    type: GET_RULES,
    request: {
      op: 'get',
      path: `${url}/@rules`,
    },
  };
}

/**
 * Get rules function.
 * @function enableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Get rules action.
 */
export function enableRules(url, rules) {
  return {
    type: ENABLE_RULES,
    request: {
      op: 'post',
      path: `${url}/@rules`,
      data: {
        'form.button.Enable': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Get rules function.
 * @function disableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Get rules action.
 */
export function disableRules(url, rules) {
  return {
    type: DISABLE_RULES,
    request: {
      op: 'post',
      path: `${url}/@rules`,
      data: {
        'form.button.Disable': true,
        rule_ids: rules,
      },
    },
  };
}
