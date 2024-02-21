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
  ADD_NEW_CONTENT_RULE,
  EDIT_CONTROLPANEL_RULE,
  DELETECONDITION_CONTROLPANEL_RULE,
  DELETEACTION_CONTROLPANEL_RULE,
  ADDCONDITION_CONTROLPANEL_RULE,
  EDITCONDITION_CONTROLPANEL_RULE,
  GETCONDITION_CONTROLPANEL_RULE,
  ADDACTION_CONTROLPANEL_RULE,
  GETACTION_CONTROLPANEL_RULE,
  EDITACTION_CONTROLPANEL_RULE,
  MOVE_CONTENT_RULE,
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

/**
 * Add new rule function.
 * @function addNewRule
 * @param {string} url Content url.
 * @returns {Object} Add new rule action.
 */
export function addNewRule(url, data) {
  return {
    type: ADD_NEW_CONTENT_RULE,
    request: {
      op: 'post',
      path: `${url}/@controlpanels/content-rules`,
      data,
    },
  };
}

/**
 * Move rule condition function.
 * @function moveRuleCondition
 * @param {string} url Content url.
 * @returns {Object} Move rule condition action.
 */
export function moveRuleCondition(url, data, ruleId, condId) {
  return {
    type: MOVE_CONTENT_RULE,
    request: {
      op: 'patch',
      path: `${url}/@controlpanels/content-rules/${ruleId}/condition/${condId}`,
      data,
    },
  };
}

/**
 * Move rule action function.
 * @function moveRuleAction
 * @param {string} url Content url.
 * @returns {Object} Move rule action action.
 */
export function moveRuleAction(url, data, ruleId, actionId) {
  return {
    type: MOVE_CONTENT_RULE,
    request: {
      op: 'patch',
      path: `${url}/@controlpanels/content-rules/${ruleId}/action/${actionId}`,
      data,
    },
  };
}

/**
 * Edit rule function.
 * @function editRule
 * @param {string} url Content url.
 * @returns {Object} Edit rule action.
 */
export function editRule(url, data, rule) {
  return {
    type: EDIT_CONTROLPANEL_RULE,
    request: {
      op: 'patch',
      path: `${url}/@controlpanels/content-rules/${rule}`,
      data: { 'form.button.Save': true, ...data },
    },
  };
}

/**
 * Remove rule condition function.
 * @function removeCondition
 * @param {string} url Content url.
 * @returns {Object} Remove rule condition action.
 */
export function removeCondition(url, rule, condition) {
  return {
    type: DELETECONDITION_CONTROLPANEL_RULE,
    request: {
      op: 'del',
      path: `${url}/@controlpanels/content-rules/${rule}/condition/${condition}`,
    },
  };
}

/**
 * Add rule condition function.
 * @function addCondition
 * @param {string} url Content url.
 * @returns {Object} Add rule condition action.
 */
export function addCondition(url, rule, data) {
  return {
    type: ADDCONDITION_CONTROLPANEL_RULE,
    request: {
      op: 'post',
      path: `${url}/@controlpanels/content-rules/${rule}/condition`,
      data,
    },
  };
}

/**
 * Edit rule condition function.
 * @function editCondition
 * @param {string} url Content url.
 * @returns {Object} Edit rule condition action.
 */
export function editCondition(url, rule, data, condition_index) {
  return {
    type: EDITCONDITION_CONTROLPANEL_RULE,
    request: {
      op: 'patch',
      path: `${url}/@controlpanels/content-rules/${rule}/condition/${condition_index}`,
      data,
    },
  };
}

/**
 * Get rule condition function.
 * @function getCondition
 * @param {string} url Content url.
 * @returns {Object} Get rule condition action.
 */
export function getCondition(url, rule, condition_index) {
  return {
    type: GETCONDITION_CONTROLPANEL_RULE,
    request: {
      op: 'get',
      path: `${url}/@controlpanels/content-rules/${rule}/condition/${condition_index}`,
    },
  };
}

/**
 * Remove rule action function.
 * @function removeAction
 * @param {string} url Content url.
 * @returns {Object} Remove rule ction action.
 */
export function removeAction(url, rule, action) {
  return {
    type: DELETEACTION_CONTROLPANEL_RULE,
    request: {
      op: 'del',
      path: `${url}/@controlpanels/content-rules/${rule}/action/${action}`,
    },
  };
}

/**
 * Add rule action function.
 * @function addAction
 * @param {string} url Content url.
 * @returns {Object} Add rule ction action.
 */
export function addAction(url, rule, data) {
  return {
    type: ADDACTION_CONTROLPANEL_RULE,
    request: {
      op: 'post',
      path: `${url}/@controlpanels/content-rules/${rule}/action`,
      data,
    },
  };
}

/**
 * Edit rule action function.
 * @function editAction
 * @param {string} url Content url.
 * @returns {Object} Edit rule action action.
 */
export function editAction(url, rule, data, action_index) {
  return {
    type: EDITACTION_CONTROLPANEL_RULE,
    request: {
      op: 'patch',
      path: `${url}/@controlpanels/content-rules/${rule}/action/${action_index}`,
      data,
    },
  };
}

/**
 * Get rule action function.
 * @function getAction
 * @param {string} url Content url.
 * @returns {Object} Get rule action action.
 */
export function getAction(url, rule, action_index) {
  return {
    type: GETACTION_CONTROLPANEL_RULE,
    request: {
      op: 'get',
      path: `${url}/@controlpanels/content-rules/${rule}/action/${action_index}`,
    },
  };
}
