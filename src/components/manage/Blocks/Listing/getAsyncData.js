import { getQueryStringResults } from '@plone/volto/actions';

export default ({ dispatch, data, path }) => {
  return [
    dispatch(
      getQueryStringResults(
        path,
        {
          ...data,
          ...(data.variation?.fullobjects
            ? { fullobjects: 1 }
            : { metadata_fields: '_all' }),
        },
        data.block,
      ),
    ),
  ];
};
