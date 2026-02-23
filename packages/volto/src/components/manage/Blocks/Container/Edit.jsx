import { useState } from 'react';
import { useIntl } from 'react-intl';
import pickBy from 'lodash/pickBy';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlocksForm } from '@plone/volto/components/manage/Form';
import PropTypes from 'prop-types';
import ContainerData from './Data';
import DefaultEditBlockWrapper from './EditBlockWrapper';
import SimpleContainerToolbar from './SimpleContainerToolbar';
import { v4 as uuid } from 'uuid';
import { blocksFormGenerator } from '@plone/volto/helpers/Blocks/Blocks';

import DefaultTemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';

import config from '@plone/volto/registry';

const ContainerBlockEdit = (props) => {
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
  const ContainerToolbar =
    blockConfig.containerToolbar || SimpleContainerToolbar;

  // Custom components from config or default ones
  const TemplateChooser = blockConfig.templateChooser || DefaultTemplateChooser;
  const EditBlockWrapper =
    blockConfig.editBlockWrapper || DefaultEditBlockWrapper;

  let [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );
  if (props.setSelectedBlock) {
    ({ selectedBlock, setSelectedBlock } = props);
  }

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

  const containerProps = {
    ...props,
    allowedBlocks,
    allowedBlocksConfig,
    blocksConfig,
    blockType,
    maxLength,
    metadata,
    onAddNewBlock,
    onSelectTemplate,
    selectedBlock,
    setSelectedBlock,
    templates,
  };

  return (
    <>
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      {selected && <ContainerToolbar {...containerProps} />}

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
        isContainer
        isMainForm={false}
        stopPropagation={selectedBlock}
        disableAddBlockOnEnterKey
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
          if (['blocks', 'blocks_layout'].includes(id)) {
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

ContainerBlockEdit.propTypes = {
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default ContainerBlockEdit;
