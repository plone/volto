import { LIST_ADDONS } from '@plone/volto/constants/ActionTypes';
import { listAddons } from '@plone/volto/actions/addons/addons';

const getMultilingualInstalledAsyncPropExtender = {
  path: '/',
  extend: (dispatchActions) => {
    if (
      dispatchActions.filter((asyncAction) => asyncAction.key === LIST_ADDONS)
        .length === 0
    ) {
      dispatchActions.push({
        key: LIST_ADDONS,
        promise: ({ location, store: { dispatch } }) =>
          __SERVER__ && dispatch(listAddons()),
      });
    }
    return dispatchActions;
  },
};

export { getMultilingualInstalledAsyncPropExtender };
