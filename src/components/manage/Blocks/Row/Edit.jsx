import React, { useState } from 'react';
import { isEmpty, pickBy } from 'lodash';
import { BlocksForm, SidebarPortal, Icon } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Button, Grid, Ref } from 'semantic-ui-react';
import GridData from './Data';
import EditBlockWrapper from './EditBlockWrapper';
import { useIntl } from 'react-intl';

import TemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';
import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import templates from './templates';

import config from '@plone/volto/registry';

function getAllowedBlocks(type) {
  return config.blocks.blocksConfig?.[type]?.allowedBlocks;
}

function emptyBlocksForm() {
  return {
    blocks: {},
    blocks_layout: {
      items: [],
    },
  };
}

const RowEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    manage,
    formDescription,
  } = props;

  const intl = useIntl();
  const metadata = props.metadata || props.properties;
  const data_blocks = data?.data?.blocks;
  const properties = isEmpty(data_blocks) ? emptyBlocksForm() : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  React.useEffect(() => {
    if (
      isEmpty(data_blocks) &&
      properties.blocks_layout.items[0] !== selectedBlock
    ) {
      setSelectedBlock(properties.blocks_layout.items[0]);
      onChangeBlock(block, {
        ...data,
        data: properties,
      });
    }
  }, [onChangeBlock, properties, selectedBlock, block, data, data_blocks]);

  const blockState = {};

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  const allowedBlocks = [...getAllowedBlocks(data['@type']), 'emptyRowCell'];

  const onSelectTemplate = (templateIndex) => {
    const resultantTemplates =
      getAllowedBlocks(data['@type'])?.length === 1
        ? templates(getAllowedBlocks(data['@type'])[0])
        : templates();
    onChangeBlock(block, {
      ...data,
      data: resultantTemplates(intl)[templateIndex].blocksData,
    });
  };

  const allowedBlocksConfig = pickBy(config.blocks.blocksConfig, (value, key) =>
    allowedBlocks.includes(key),
  );

  return (
    <fieldset className="section-block">
      {selected && (
        <div className="toolbar">
          <Button.Group>
            <Button
              aria-label={`Add grid element`}
              icon
              basic
              onClick={(e) => this.addNewColumn(e)}
            >
              <Icon name={addSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              aria-label={`Select grid block`}
              icon
              basic
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlock();
                props.setSidebarTab(1);
                // this.node.current.focus();
              }}
            >
              <Icon name={configSVG} size="24px" />
            </Button>
          </Button.Group>
        </div>
      )}
      {isEmpty(data_blocks) && (
        <TemplateChooser
          templates={
            getAllowedBlocks(data['@type'])?.length === 1
              ? templates(getAllowedBlocks(data['@type'])[0])
              : templates()
          }
          onSelectTemplate={onSelectTemplate}
        />
      )}
      <BlocksForm
        metadata={metadata}
        properties={properties}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        blocksConfig={allowedBlocksConfig}
        title={data.placeholder}
        description={instructions}
        onSelectBlock={(id) => {
          setSelectedBlock(id);
        }}
        onChangeFormData={(newFormData) => {
          onChangeBlock(block, {
            ...data,
            data: newFormData,
          });
        }}
        onChangeField={(id, value) => {
          if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
            blockState[id] = value;
            onChangeBlock(block, {
              ...data,
              data: {
                ...data.data,
                ...blockState,
              },
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
      <SidebarPortal
        selected={
          selected
          // selected &&
          // !this.state.selectedColumnIndex &&
          // this.state.selectedColumnIndex !== 0
        }
      >
        <GridData {...props}></GridData>
      </SidebarPortal>
    </fieldset>
  );
};

RowEdit.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};

export default RowEdit;
