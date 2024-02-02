import { getQueryStringResults } from '@plone/volto/actions';
import { resolveBlockExtensions } from '@plone/volto/helpers';

export default function getListingBlockAsyncData(props) {
  const { data, path, location, id, dispatch, blocksConfig, content } = props;

  const { resolvedExtensions } = resolveBlockExtensions(data, blocksConfig);

  const subrequestID = content?.UID ? `${content?.UID}-${id}` : id;

  // retrieve the current page from the location querystring
  const currentPage = location?.query?.split(/page=(\d+)/)[1] || 1;

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
        currentPage,
      ),
    ),
  ];
}
