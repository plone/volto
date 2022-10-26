import { getQueryStringResults } from '@plone/volto/actions';
import { resolveBlockExtensions } from '@plone/volto/helpers';

export default ({ dispatch, data, path, blocksConfig }) => {
  const { resolvedExtensions } = resolveBlockExtensions(data, blocksConfig);

  return [
    dispatch(
      getQueryStringResults(
        path,
        {
          ...data.querystring,
          ...(resolvedExtensions?.variation?.fullobjects
            ? { fullobjects: 1 }
            : { metadata_fields: '_all' }),
        },
        data.block,
      ),
    ),
  ];
};
