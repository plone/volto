import {
  ADD_RULE,
  GET_RULES,
  ENABLE_RULES,
  DISABLE_RULES,
  APPLY_SUB_RULES,
  UNAPPLY_SUB_RULES,
  REMOVE_RULES,
  GET_CONTROLPANEL_RULES,
  GET_CONTROLPANEL_RULE,
  DELETE_CONTROLPANEL_RULE,
  GET_CONTENT_RULES_EVENTS,
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
      path: `${url}/@content-rules`,
    },
  };
}

/**
 * Get rules for control panel function.
 * @function getControlPanelRules
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getControlPanelRules(url) {
  return {
    type: GET_CONTROLPANEL_RULES,
    request: {
      op: 'get',
      path: `${url}/@controlpanels/content-rules`,
    },
  };
}

/**
 * Get rules for control panel function.
 * @function getControlPanelRule
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getControlPanelRule(url, rule) {
  return {
    type: GET_CONTROLPANEL_RULE,
    request: {
      op: 'get',
      path: `${url}/@controlpanels/content-rules/${rule}`,
    },
  };
}

/**
 * Enable rules function.
 * @function enableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Enable rules action.
 */
export function enableRules(url, rules) {
  return {
    type: ENABLE_RULES,
    request: {
      op: 'patch',
      path: `${url}/@content-rules`,
      data: {
        'form.button.Enable': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Disable rules function.
 * @function disableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Disable rules action.
 */
export function disableRules(url, rules) {
  return {
    type: DISABLE_RULES,
    request: {
      op: 'patch',
      path: `${url}/@content-rules`,
      data: {
        'form.button.Disable': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Apply rules to subfolders function.
 * @function applyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} apply rules to subfolders action.
 */
export function applyRulesToSubfolders(url, rules) {
  return {
    type: APPLY_SUB_RULES,
    request: {
      op: 'patch',
      path: `${url}/@content-rules`,
      data: {
        'form.button.Bubble': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Unnaply Rules to subfolders function.
 * @function unapplyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} unnaply rules to subfolders action.
 */
export function unapplyRulesToSubfolders(url, rules) {
  return {
    type: UNAPPLY_SUB_RULES,
    request: {
      op: 'patch',
      path: `${url}/@content-rules`,
      data: {
        'form.button.NoBubble': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Remove rules function.
 * @function removeRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} remove rules action.
 */
export function removeRules(url, rules) {
  return {
    type: REMOVE_RULES,
    request: {
      op: 'del',
      path: `${url}/@content-rules`,
      data: {
        'form.button.Delete': true,
        rule_ids: rules,
      },
    },
  };
}

/**
 * Add rules function.
 * @function addRule
 * @param {string} url Content url.
 * @param {string} rule String with rule id.
 * @returns {Object} add rule action.
 */
export function addRule(url, rule) {
  return {
    type: ADD_RULE,
    request: {
      op: 'post',
      path: `${url}/@content-rules/${rule}`,
    },
  };
}

/**
 * Delete rule function.
 * @function deleteControlPanelRule
 * @param {string} url Content url.
 * @param {string} rule String with rule id.
 * @returns {Object} delete rule action.
 */
export function deleteControlPanelRule(url, rule) {
  return {
    type: DELETE_CONTROLPANEL_RULE,
    request: {
      op: 'del',
      path: `${url}/@controlpanels/content-rules/${rule}`,
    },
  };
}

/**
 * Get content rules events function.
 * @function getContentRulesEvents
 * @param {string} url Content url.
 * @returns {Object} Get content rules events action.
 */
export function getContentRulesEvents(url) {
  return {
    type: GET_CONTENT_RULES_EVENTS,
    request: {
      op: 'get',
      path: `${url}/@vocabularies/plone.contentrules.events`,
    },
  };
}
