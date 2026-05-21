import { useEffect } from 'react';
import type { BlockEditProps } from '@plone/types';

import ListingBlockView from './ListingBlockView';
import { useQuerystringResults } from './useQuerystringResults';

const hasQuery = (value: any): boolean => {
  if (!value) return false;

  if (typeof value === 'object' && 'query' in value) {
    const query = value.query;
    return Array.isArray(query) && query.length > 0;
  }

  return false;
};

const ListingEdit = (props: BlockEditProps) => {
  const { data, setBlock } = props;
  const hasListingQuery = hasQuery(data.querystring as any);
  const { items } = useQuerystringResults(data.querystring as any);

  useEffect(() => {
    if (hasListingQuery && items.length > 0) {
      setBlock({
        ...data,
        items,
      });
    }
  }, [items, hasListingQuery, data, setBlock]);

  if (!hasListingQuery) {
    return (
      <div
        className={[
          'placeholder rounded-md border border-dashed border-quanta-azure bg-quanta-air',
          'p-6 text-center text-quanta-iron',
        ].join(' ')}
      >
        <p>No Results Found</p>
      </div>
    );
  }

  return <ListingBlockView {...props} isEditMode />;
};

export default ListingEdit;
