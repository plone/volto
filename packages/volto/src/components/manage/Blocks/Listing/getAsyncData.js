import { getQueryStringResults } from '@plone/volto/actions';
import { resolveBlockExtensions } from '@plone/volto/helpers';
import qs from 'query-string';
import { slugify } from '@plone/volto/helpers';

const getCurrentPage = (location, id) => {
  const pageQueryParam = qs.parse(location.search);
  const hasMultiplePaginations = Object.keys(pageQueryParam).length > 1;
  return hasMultiplePaginations
    ? parseInt(pageQueryParam[slugify(`page-${id}`)])
    : pageQueryParam['page'] || 1;
};

export default function getListingBlockAsyncData(props) {
  const { data, path, location, id, dispatch, blocksConfig, content } = props;

  const { resolvedExtensions } = resolveBlockExtensions(data, blocksConfig);

  const subrequestID = content?.UID ? `${content?.UID}-${id}` : id;
  const currentPage = getCurrentPage(location, id);

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
