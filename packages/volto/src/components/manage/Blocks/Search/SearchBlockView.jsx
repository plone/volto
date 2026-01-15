import React from 'react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

import config from '@plone/volto/registry';

import { withSearch, withQueryString } from './hocs';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import isEqual from 'es-toolkit/compat/isEqual';
import isFunction from 'es-toolkit/compat/isFunction';
import cx from 'classnames';

const getListingBodyVariation = (data) => {
  const { variations } = config.blocks.blocksConfig.listing;

  let variation = data.listingBodyTemplate
    ? variations.find(({ id }) => id === data.listingBodyTemplate)
    : variations.find(({ isDefault }) => isDefault);

  if (!variation) variation = variations[0];

  return variation;
};

const isfunc = (obj) => isFunction(obj) || typeof obj === 'function';

const _filtered = (obj) =>
  Object.assign(
    {},
    ...Object.keys(obj).map((k) => {
      const reject = k !== 'properties' && !isfunc(obj[k]);
      return reject ? { [k]: obj[k] } : {};
    }),
  );

const blockPropsAreChanged = (prevProps, nextProps) => {
  const prev = _filtered(prevProps);
  const next = _filtered(nextProps);

  return isEqual(prev, next);
};

const applyDefaults = (data, root, blockQuery) => {
  const defaultQuery = [
    {
      i: 'path',
      o: 'plone.app.querystring.operation.string.absolutePath',
      v: root || '/',
    },
  ];

  const dataQuery = data?.query?.length ? data.query : [];
  const searchBySearchableText = dataQuery.filter(
    (item) => item['i'] === 'SearchableText',
  ).length;

  const sort_on = data?.sort_on
    ? { sort_on: data.sort_on }
    : searchBySearchableText === 0
      ? { sort_on: 'effective' }
      : {};
  const sort_order = data?.sort_order
    ? { sort_order: data.sort_order }
    : searchBySearchableText === 0
      ? { sort_order: 'descending' }
      : {};

  // We start with the base query from the block.
  // We enhance it with the query from the facets (filters).
  // We fall back to the default query.
  let query = blockQuery?.length ? blockQuery : [];
  if (!query.length) {
    query = dataQuery.length ? dataQuery : defaultQuery;
  } else if (dataQuery.length) {
    // We have both a base query and a filter.  Combine them.
    // Items in the filter win over items in the base query.
    const filterKeys = new Set(dataQuery.map((obj) => obj.i));
    query = [
      ...dataQuery,
      ...blockQuery.filter((item) => !filterKeys.has(item.i)),
    ];
  }

  return {
    ...data,
    ...sort_on,
    ...sort_order,
    query,
  };
};

const SearchBlockView = (props) => {
  const { id, data, searchData, mode = 'view', variation, className } = props;

  const Layout = variation.view;

  const dataListingBodyVariation = getListingBodyVariation(data).id;
  const [selectedView, setSelectedView] = React.useState(
    dataListingBodyVariation,
  );

  // in the block edit you can change the used listing block variation,
  // but it's cached here in the state. So we reset it.
  React.useEffect(() => {
    if (mode !== 'view') {
      setSelectedView(dataListingBodyVariation);
    }
  }, [dataListingBodyVariation, mode]);

  const root = useSelector((state) => state.breadcrumbs.root);
  const listingBodyData = applyDefaults(searchData, root, data.query?.query);

  const { variations } = config.blocks.blocksConfig.listing;
  const listingBodyVariation = variations.find(({ id }) => id === selectedView);

  return (
    <div className={cx('block search', selectedView, className)}>
      <Layout
        {...props}
        isEditMode={mode === 'edit'}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      >
        <ListingBody
          id={id}
          variation={{ ...data, ...listingBodyVariation }}
          data={listingBodyData}
          path={props.path}
          isEditMode={mode === 'edit'}
        />
      </Layout>
    </div>
  );
};

export const SearchBlockViewComponent = compose(
  withBlockExtensions,
  (Component) => React.memo(Component, blockPropsAreChanged),
)(SearchBlockView);

export default withSearch()(withQueryString(SearchBlockViewComponent));
