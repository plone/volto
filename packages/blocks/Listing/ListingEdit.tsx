import { useCallback, type ComponentType } from 'react';
import type { BlockEditProps } from '@plone/types';

import config from '@plone/registry';
import ListingBlockView from './ListingBlockView';

const hasQuery = (value: any): boolean => {
  if (!value) return false;

  if (typeof value === 'object' && 'query' in value) {
    const query = value.query;
    return Array.isArray(query) && query.length > 0;
  }

  return false;
};
const ListingEdit = (props: BlockEditProps) => {
  const { data } = props;
  const hasListingQuery = hasQuery(data.querystring as any);

  const QuerystringWidget = config.getWidget('querystring') as
    | ComponentType<any>
    | undefined;

  if (!hasListingQuery) {
    return (
      <div className="listing message">
        <p>No Results Found</p>
      </div>
    );
  }

  return <ListingBlockView {...props} isEditMode />;
};

export default ListingEdit;
