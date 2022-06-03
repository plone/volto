import {
  GET_RULES,
  ENABLE_RULES,
  DISABLE_RULES,
  APPLY_SUB_RULES,
  UNAPPLY_SUB_RULES,
  REMOVE_RULES,
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
      op: 'patch',
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
      op: 'patch',
      path: `${url}/@rules`,
      data: {
        'form.button.Disable': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Get rules function.
 * @function applyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Get rules action.
 */
export function applyRulesToSubfolders(url, rules) {
  return {
    type: APPLY_SUB_RULES,
    request: {
      op: 'patch',
      path: `${url}/@rules`,
      data: {
        'form.button.Bubble': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Get rules function.
 * @function unapplyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Get rules action.
 */
export function unapplyRulesToSubfolders(url, rules) {
  return {
    type: UNAPPLY_SUB_RULES,
    request: {
      op: 'patch',
      path: `${url}/@rules`,
      data: {
        'form.button.NoBubble': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Get rules function.
 * @function removeRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Get rules action.
 */
export function removeRules(url, rules) {
  return {
    type: REMOVE_RULES,
    request: {
      op: 'del',
      path: `${url}/@rules`,
      data: {
        'form.button.Delete': true,
        rule_ids: rules,
      },
    },
  };
}
