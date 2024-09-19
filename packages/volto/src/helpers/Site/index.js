import { GET_SITE } from '@plone/volto/constants/ActionTypes';
import { getSite } from '@plone/volto/actions';

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
          import.meta.env.SSR && dispatch(getSite()),
      });
    }
    return dispatchActions;
  },
};

export { getSiteAsyncPropExtender };
