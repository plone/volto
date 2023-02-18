import { map } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';
import { useLocation } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

/**
 * Recursive function that process the items returned by the navigation
 * endpoint
 * @function getRecursiveItems
 * @param {array} items The items inside a navigation response.
 * @returns {*} The navigation items object (recursive)
 */
function getRecursiveItems(items) {
  return map(items, (item) => ({
    title: item.title,
    description: item.description,
    url: flattenToAppURL(item['@id']),
    ...(item.items && { items: getRecursiveItems(item.items) }),
  }));
}

const useNavigation = () => {
  const path = useLocation().pathname;
  const expanders = config.settings.contentAPIExpanders;
  // Reduce the data returned with the select 'a la useSelector'
  // See https://tkdodo.eu/blog/react-query-data-transformations
  const select = (data) =>
    getRecursiveItems(data['@components'].navigation.items);
  const { data } = useQuery(getContentQuery({ path, expanders, select }));
  // Reducer-ish default value should be returned while data is still undefined
  return data || [];
};

export default useNavigation;
