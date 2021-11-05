import React from 'react';
import { isEqual } from 'lodash';
import { usePrevious } from './usePrevious';
import useDeepCompareEffect from 'use-deep-compare-effect';

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (query, defaultPage = 1) => {
  const previousQuery = usePrevious(query);
  const [currentPage, setCurrentPage] = React.useState(defaultPage);

  useDeepCompareEffect(() => {
    setCurrentPage(defaultPage);
  }, [query, previousQuery, defaultPage]);

  return {
    currentPage:
      previousQuery && !isEqual(previousQuery, query)
        ? defaultPage
        : currentPage,
    setCurrentPage,
  };
};
