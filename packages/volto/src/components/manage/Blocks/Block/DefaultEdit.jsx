import React from 'react';
import config from '@plone/volto/registry';
import { useIntl } from 'react-intl';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import DefaultBlockView from './DefaultView';

const DefaultBlockEdit = (props) => {
  const { blocksConfig = config.blocks.blocksConfig } = props;
  const { data, onChangeBlock, block, selected, navRoot, contentType } = props;
  const intl = useIntl();
  const blockSchema = blocksConfig?.[data['@type']]?.blockSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ ...props, intl })
      : blockSchema;

  const BlockView = blocksConfig?.[data['@type']]?.['view'] || DefaultBlockView;
  return (
    <>
      <BlockView {...props} />
      {schema ? (
        <SidebarPortal selected={selected}>
          <BlockDataForm
            block={block}
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
            navRoot={navRoot}
            contentType={contentType}
          />
        </SidebarPortal>
      ) : (
        ''
      )}
    </>
  );
};

export default DefaultBlockEdit;
