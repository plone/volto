import { GET_SITE } from '@plone/volto/constants/ActionTypes';
import { getSite } from '@plone/volto/actions/site/site';
import {
  listControlpanels,
  getSystemInformation,
} from '@plone/volto/actions/controlpanels/controlpanels';
import config from '@plone/volto/registry';

const prefixPath = config.settings.subpathPrefix || '';

const getSiteAsyncPropExtender = {
  path: '/',
  extend: (dispatchActions) => {
    if (
      dispatchActions.filter((asyncAction) => asyncAction.key === GET_SITE)
        .length === 0
    ) {
      dispatchActions.push({
        key: GET_SITE,
        promise: ({ location, store: { dispatch } }) =>
          __SERVER__ && dispatch(getSite()),
      });
    }
    return dispatchActions;
  },
};

const getControlpanelAsyncPropExtender = {
  path: `${prefixPath}/controlpanel`,
  extend: (dispatchActions) => {
    if (
      dispatchActions.filter(
        (asyncAction) => asyncAction.key === 'controlpanels',
      ).length === 0
    ) {
      dispatchActions.push({
        key: 'controlpanels',
        promise: ({ location, store: { dispatch } }) =>
          __SERVER__ && dispatch(listControlpanels()),
      });
    }
    return dispatchActions;
  },
};

const getSystemInfoAsyncPropExtender = {
  path: `${prefixPath}/controlpanel`,
  extend: (dispatchActions) => {
    if (
      dispatchActions.filter(
        (asyncAction) => asyncAction.key === 'systemInformation',
      ).length === 0
    ) {
      dispatchActions.push({
        key: 'systemInformation',
        promise: ({ location, store: { dispatch } }) =>
          __SERVER__ && dispatch(getSystemInformation()),
      });
    }
    return dispatchActions;
  },
};

export {
  getSiteAsyncPropExtender,
  getSystemInfoAsyncPropExtender,
  getControlpanelAsyncPropExtender,
};
