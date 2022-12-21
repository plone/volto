import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

/**
 * @function useCreatePageQueryStringKey
 * @description A hook that creates a key with an id if there are multiple blocks with pagination.
 * @returns {string} Example: page || page_012345678
 */
const useCreatePageQueryStringKey = (id) => {
  const blockTypesWithPagination = ['search', 'listing'];
  const blocks = useSelector((state) => state.content.data.blocks);
  const hasMultiplePaginations =
    Object.values(blocks).filter((item) =>
      blockTypesWithPagination.includes(item['@type']),
    ).length > 1 || false;

  return hasMultiplePaginations ? slugify(`page-${id}`) : 'page';
};

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (id = null, defaultPage = 1) => {
  const location = useLocation();
  const history = useHistory();
  const pageQueryStringKey = useCreatePageQueryStringKey(id);
  const pageQueryParam =
    qs.parse(location.search)[pageQueryStringKey] || defaultPage;
  const [currentPage, setCurrentPage] = React.useState(pageQueryParam);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (!firstUpdate.current) {
      const newParams = {
        ...qs.parse(location.search),
        [pageQueryStringKey]: currentPage,
      };
      history.replace({
        search: qs.stringify(newParams),
      });
    }
    firstUpdate.current = false;
  }, [currentPage, defaultPage, location.search, history, pageQueryStringKey]);

  return {
    currentPage,
    setCurrentPage,
  };
};
