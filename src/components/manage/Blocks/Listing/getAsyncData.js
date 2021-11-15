import { getQueryStringResults } from '@plone/volto/actions';
import config from '@plone/volto/registry';

export default ({ dispatch, data, path }) => {
  return [
    dispatch(
      getQueryStringResults(
        path,
        {
          ...data,
          ...(config.settings.bbb_listingBlockFetchesFullobjects
            ? { fullobjects: 1 }
            : { metadata_fields: '_all' }),
        },
        data.block,
      ),
    ),
  ];
};
