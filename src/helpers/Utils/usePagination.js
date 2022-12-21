import React, { useEffect } from 'react';
import { isEqual } from 'lodash';
import { usePrevious } from './usePrevious';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (query, defaultPage = 1) => {
  const previousQuery = usePrevious(query);
  const location = useLocation();
  const queryParamPage = qs.parse(location.search).page || defaultPage;
  const [currentPage, setCurrentPage] = React.useState(queryParamPage);
  useDeepCompareEffect(() => {
    setCurrentPage(queryParamPage);
  }, [queryParamPage, query, previousQuery]);

  useEffect(() => {
    if (currentPage !== defaultPage) {
      const newParams = {
        ...qs.parse(location.search),
        page: currentPage,
      };
      const params = qs.stringify(newParams);
      window.history.replaceState(null, null, '?' + params);
    }
  }, [currentPage, defaultPage, location.search]);

  return {
    currentPage:
      previousQuery && !isEqual(previousQuery, query)
        ? defaultPage
        : currentPage,
    setCurrentPage,
  };
};
