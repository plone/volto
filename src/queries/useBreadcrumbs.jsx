import { map } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';
import { useLocation } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

/**
 * Function that process the items returned by the breadcrumbs
 * endpoint
 * @function reduceItems
 * @param {object} breadcrumbs The breadcrumbs response.
 * @returns {*} The navigation items object (recursive)
 */
function reduceItems(breadcrumbs) {
  return {
    items: map(breadcrumbs.items, (item) => ({
      title: item.title,
      description: item.description,
      url: flattenToAppURL(item['@id']),
    })),
    root: breadcrumbs.root,
  };
}

const useBreadcrumbs = () => {
  const path = useLocation().pathname;
  const expanders = config.settings.contentAPIExpanders;
  // Reduce the data returned with the select 'a la useSelector'
  // See https://tkdodo.eu/blog/react-query-data-transformations
  const select = (data) => reduceItems(data['@components'].breadcrumbs);
  const { data } = useQuery(getContentQuery({ path, expanders, select }));
  // Reducer-ish default value should be returned while data is still undefined
  return data || { items: [] };
};

export default useBreadcrumbs;
