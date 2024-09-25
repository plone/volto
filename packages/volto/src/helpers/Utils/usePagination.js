import React, { useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import { findBlocks } from '@plone/volto/helpers/Blocks/Blocks';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

/**
 * @function useCreatePageQueryStringKey
 * @description A hook that creates a key with an id if there are multiple blocks with pagination.
 * @returns {string} Example: page || page_012345678
 */
const useCreatePageQueryStringKey = (id) => {
  const blockTypesWithPagination = ['search', 'listing'];
  const blocks = useSelector((state) => state?.content?.data?.blocks) || [];
  const hasMultiplePaginations =
    findBlocks(blocks, blockTypesWithPagination).length > 1;

  return hasMultiplePaginations ? slugify(`page-${id}`) : 'page';
};

const useGetBlockType = (id) => {
  const blocks = useSelector((state) => state?.content?.data?.blocks) || [];
  const block = blocks[id];
  return block ? block?.['@type'] : null;
};

/**
 * A pagination helper that tracks the query and resets pagination in case the
 * query changes.
 */
export const usePagination = (id = null, defaultPage = 1) => {
  const location = useLocation();
  const history = useHistory();
  const pageQueryStringKey = useCreatePageQueryStringKey(id);
  const block_type = useGetBlockType(id);
  const pageQueryParam =
    qs.parse(location.search)[pageQueryStringKey] || defaultPage;
  const [currentPage, setCurrentPageState] = React.useState(
    parseInt(pageQueryParam),
  );
  const setCurrentPage = (page) => {
    setCurrentPageState(page);
    const newParams = {
      ...qs.parse(location.search),
      [pageQueryStringKey]: page,
    };
    history.push({ search: qs.stringify(newParams) });
  };

  const queryRef = useRef(qs.parse(location.search)?.query);
  useEffect(() => {
    if (
      queryRef.current !== qs.parse(location.search)?.query &&
      block_type === 'search'
    ) {
      setCurrentPageState(defaultPage);
      const newParams = {
        ...qs.parse(location.search),
        [pageQueryStringKey]: defaultPage,
      };
      delete newParams[pageQueryStringKey];
      history.replace({ search: qs.stringify(newParams) });
      queryRef.current = qs.parse(location.search)?.query;
    } else {
      setCurrentPageState(
        parseInt(
          qs.parse(location.search)?.[pageQueryStringKey] || defaultPage,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, block_type]);

  return {
    currentPage,
    setCurrentPage,
  };
};
