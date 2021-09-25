import React from 'react';

import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { withBlockExtensions } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { withSearch } from './hocs';
import { compose } from 'redux';
import { isEqual, isFunction } from 'lodash';
import useDeepCompareEffect from 'use-deep-compare-effect';

const getListingBodyVariation = (data) => {
  const { variations } = config.blocks.blocksConfig.listing;

  const variation = data.listingBodyTemplate
    ? variations.find(({ id }) => id === data.listingBodyTemplate)
    : variations.find(({ isDefault }) => isDefault);

  return variation;
};

const isfunc = (obj) => isFunction(obj) || typeof obj === 'function';

const blockPropsAreChanged = (prevProps, nextProps) => {
  const filtered = (obj) =>
    Object.assign(
      {},
      ...Object.keys(obj).map((k) => {
        const reject = k !== 'properties' && !isfunc(obj[k]);
        return reject ? { [k]: obj[k] } : {};
      }),
    );

  const prev = filtered(prevProps);
  const next = filtered(nextProps);

  return isEqual(prev, next);
};

const SearchBlockView = (props) => {
  const { data, searchData, mode = 'view', variation, onTriggerSearch } = props;

  const Layout = variation.view;

  const listingBodyVariation = getListingBodyVariation(data);

  // const { query = {} } = data || {};
  // useDeepCompareEffect(() => {
  //   onTriggerSearch();
  // }, [query, onTriggerSearch]);

  React.useEffect(() => {
    return () => {
      console.log('unmount block');
    };
  });

  return (
    <div className="block search">
      <Layout {...props} isEditMode={mode === 'edit'}>
        <ListingBody
          variation={listingBodyVariation}
          data={searchData || {}}
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

export default withSearch()(SearchBlockViewComponent);
