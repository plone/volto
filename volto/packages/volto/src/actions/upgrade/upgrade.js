/**
 * Upgrade actions.
 * @module actions/upgrade/upgrade
 */

import { GET_UPGRADE, POST_UPGRADE } from '@plone/volto/constants/ActionTypes';

export function getUpgradeInformation() {
  return {
    type: GET_UPGRADE,
    request: {
      op: 'get',
      path: '/@upgrade',
    },
  };
}

export function runUpgrade(dryRun) {
  return {
    type: POST_UPGRADE,
    request: {
      op: 'post',
      path: `/@upgrade`,
      data: { dryRun: dryRun },
    },
  };
}
