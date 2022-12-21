import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

/**
 * Check if are multiple blocks with pagination
 */
const useCheckIfMultiplePaginations = () => {
  const paginationBlocksType = ['search', 'listing'];
  const blocks = useSelector((state) => state.content.data.blocks);
  const checkIfMultiplePaginations =
    Object.values(blocks).filter((item) =>
      paginationBlocksType.includes(item['@type']),
    ).length > 1 || false;
  return checkIfMultiplePaginations;
};

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (id = null, defaultPage = 1) => {
  const location = useLocation();
  const history = useHistory();
  const multiplePagination = useCheckIfMultiplePaginations();
  const pageSlug = slugify(`page-${id}`);
  const pageQueryParam =
    qs.parse(location.search)[multiplePagination ? pageSlug : 'page'] ||
    defaultPage;
  const [currentPage, setCurrentPage] = React.useState(pageQueryParam);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (!firstUpdate.current) {
      const newParams = {
        ...qs.parse(location.search),
        [multiplePagination ? pageSlug : 'page']: currentPage,
      };
      history.replace({
        search: qs.stringify(newParams),
      });
    }
    firstUpdate.current = false;
  }, [
    currentPage,
    pageSlug,
    defaultPage,
    location.search,
    multiplePagination,
    history,
  ]);

  return {
    currentPage,
    setCurrentPage,
  };
};
