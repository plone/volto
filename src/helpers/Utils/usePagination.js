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
    setCurrentPage(1);
  }, [query, previousQuery]);

  return {
    currentPage:
      previousQuery && !isEqual(previousQuery, query) ? 1 : currentPage,
    setCurrentPage,
  };
};
