import React from 'react';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import Schema from './schema';
import { SearchBlockViewComponent } from './SearchBlockView';
import { SidebarPortal } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { withSearch } from './hocs';
import useDeepCompareEffect from 'use-deep-compare-effect';

const SearchBlockEdit = (props) => {
  const { block, onChangeBlock, data, selected, intl, onTriggerSearch } = props;
  let schema = Schema({ data });
  schema = addExtensionFieldToSchema({
    schema,
    name: 'listingBodyTemplate',
    items: config.blocks.blocksConfig.listing.variations,
    intl,
    title: { id: 'Listing template' },
  });

  const { query = {} } = data || {};
  useDeepCompareEffect(() => {
    onTriggerSearch();
  }, [query, onTriggerSearch]);

  return (
    <>
      <SearchBlockViewComponent
        {...props}
        path={getBaseUrl(props.pathname)}
        mode="edit"
      />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default withSearch()(SearchBlockEdit);
