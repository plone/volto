import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { pickBy } from 'lodash';
import { BlocksForm, SidebarPortal, Icon } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import ContainerData from './Data';
import DefaultEditBlockWrapper from './EditBlockWrapper';
import { v4 as uuid } from 'uuid';
import { blocksFormGenerator } from '@plone/volto/helpers';

import DefaultTemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';

import addSVG from '@plone/volto/icons/add.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import config from '@plone/volto/registry';

const messages = defineMessages({
  addBlock: {
    id: 'Add element to container',
    defaultMessage: 'Add element to container',
  },
  blockSettings: {
    id: 'Container settings',
    defaultMessage: 'Container settings',
  },
});

const ContainerEdit = (props) => {
  const {
    block,
    data,
    direction = 'horizontal',
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    manage,
  } = props;

  const intl = useIntl();
  const blockType = data['@type'];
  const metadata = props.metadata || props.properties;
  const isInitialized = data?.blocks && data?.blocks_layout;
  const properties = isInitialized ? data : blocksFormGenerator(0, '');
  const blockConfig = config.blocks.blocksConfig[blockType];
  const blocksConfig = blockConfig.blocksConfig || props.blocksConfig;
  const allowedBlocks = blockConfig.allowedBlocks;
  const maxLength = blockConfig.maxLength || 8;
  const templates = blockConfig.templates;

  // Custom components from config or default ones
  const TemplateChooser = blockConfig.templateChooser || DefaultTemplateChooser;
  const EditBlockWrapper =
    blockConfig.editBlockWrapper || DefaultEditBlockWrapper;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  const blockState = {};

  const onAddNewBlock = () => {
    const newuuid = uuid();
    const type = allowedBlocks?.length === 1 ? allowedBlocks[0] : null;
    const blocks = data.blocks || properties.blocks;
    const blocks_layout = data.blocks_layout || properties.blocks_layout;
    const newFormData = {
      ...data,
      blocks: {
        ...blocks,
        [newuuid]: { '@type': type || 'empty' },
      },
      blocks_layout: {
        items: [...blocks_layout.items, newuuid],
      },
    };
    if (blocks_layout.items.length < maxLength) {
      onChangeBlock(block, {
        ...newFormData,
      });
    }
  };

  const onSelectTemplate = (templateIndex) => {
    const resultantTemplates =
      allowedBlocks?.length === 1 ? templates(allowedBlocks[0]) : templates();
    onChangeBlock(block, {
      ...data,
      ...resultantTemplates(intl)[templateIndex].blocksData,
    });
  };

  const allowedBlocksConfig = pickBy(blocksConfig, (value, key) =>
    allowedBlocks.includes(key),
  );

  return (
    <>
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      {selected && (
        <div className="toolbar">
          <Button.Group>
            <Button
              aria-label={intl.formatMessage(messages.addBlock)}
              icon
              basic
              disabled={data?.blocks_layout?.items?.length >= maxLength}
              onClick={(e) => onAddNewBlock()}
            >
              <Icon name={addSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              aria-label={intl.formatMessage(messages.blockSettings)}
              icon
              basic
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlock();
                props.setSidebarTab(1);
              }}
            >
              <Icon name={configSVG} size="24px" />
            </Button>
          </Button.Group>
        </div>
      )}
      {!isInitialized && templates && (
        <TemplateChooser
          templates={
            allowedBlocks?.length === 1
              ? templates(allowedBlocks[0])
              : templates()
          }
          onSelectTemplate={onSelectTemplate}
        />
      )}

      <BlocksForm
        metadata={metadata}
        properties={properties}
        direction={direction}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        blocksConfig={allowedBlocksConfig}
        title={data.placeholder}
        onSelectBlock={(id) => {
          setSelectedBlock(id);
        }}
        onChangeFormData={(newFormData) => {
          onChangeBlock(block, {
            ...data,
            ...newFormData,
          });
        }}
        onChangeField={(id, value) => {
          if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
            blockState[id] = value;
            onChangeBlock(block, {
              ...data,
              ...blockState,
            });
          } else {
            onChangeField(id, value);
          }
        }}
        pathname={pathname}
      >
        {({ draginfo }, editBlock, blockProps) => (
          <EditBlockWrapper draginfo={draginfo} blockProps={blockProps}>
            {editBlock}
          </EditBlockWrapper>
        )}
      </BlocksForm>
      <SidebarPortal selected={selected && !selectedBlock}>
        <ContainerData {...props}></ContainerData>
      </SidebarPortal>
    </>
  );
};

ContainerEdit.propTypes = {
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default ContainerEdit;
