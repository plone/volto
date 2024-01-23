import { getQueryStringResults } from '@plone/volto/actions';
import { resolveBlockExtensions } from '@plone/volto/helpers';

export default function getListingBlockAsyncData(props) {
  const { data, path, id, dispatch, blocksConfig, content } = props;

  const { resolvedExtensions } = resolveBlockExtensions(data, blocksConfig);

  const subrequestID = content?.UID ? `${content?.UID}-${id}` : id;

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
        subrequestID,
      ),
    ),
  ];
}
