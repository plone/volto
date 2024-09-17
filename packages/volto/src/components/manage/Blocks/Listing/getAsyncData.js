import { getQueryStringResults } from '@plone/volto/actions';
import { resolveBlockExtensions } from '@plone/volto/helpers';
import qs from 'query-string';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

const getCurrentPage = (location, id) => {
  const pageQueryParam = qs.parse(location.search);
  switch (Object.keys(pageQueryParam).length) {
    case 0:
      return 1;
    case 1:
      // when there is only one query param, it could be the simple page number or the sluggified block id
      return pageQueryParam['page'] || pageQueryParam[slugify(`page-${id}`)];
    default:
      return pageQueryParam[slugify(`page-${id}`)];
  }
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
