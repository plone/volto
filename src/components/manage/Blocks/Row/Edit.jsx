import React, { useState } from 'react';
import { pickBy } from 'lodash';
import { BlocksForm, SidebarPortal, Icon } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import RowData from './Data';
import EditBlockWrapper from './EditBlockWrapper';
import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';

import TemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';

import addSVG from '@plone/volto/icons/add.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import templates from './templates';

import config from '@plone/volto/registry';

function getBlockConfig(type) {
  return config.blocks.blocksConfig?.[type];
}

function initBlocksForm() {
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
  } = props;

  const intl = useIntl();
  const metadata = props.metadata || props.properties;
  const isInitialized = data?.blocks && data?.blocks_layout;
  const properties = isInitialized ? data : initBlocksForm();
  const blockConfig = getBlockConfig(data['@type']);
  const blocksConfig =
    config.blocks.blocksConfig[data['@type']].blocksConfig ||
    props.blocksConfig;
  const allowedBlocks = blockConfig.allowedBlocks;
  const maxRowLength = blockConfig.maxRowLength || 8;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  // Seems never applies...
  // React.useEffect(() => {
  //   if (
  //     isEmpty(data_blocks) &&
  //     properties.blocks_layout.items[0] !== selectedBlock
  //   ) {
  //     setSelectedBlock(properties.blocks_layout.items[0]);
  //     onChangeBlock(block, {
  //       ...data,
  //       data: properties,
  //     });
  //   }
  // }, [onChangeBlock, properties, selectedBlock, block, data, data_blocks]);

  const blockState = {};

  const onAddNewBlock = () => {
    const newuuid = uuid();
    const type = allowedBlocks?.length === 1 ? allowedBlocks[0] : null;
    const newFormData = {
      ...data,
      blocks: {
        ...data.blocks,
        [newuuid]: {
          ...(type && { '@type': type }),
        },
      },
      blocks_layout: {
        items: [...data.blocks_layout.items, newuuid],
      },
    };
    if (data.blocks_layout.items.length < maxRowLength) {
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

  const direction = data['@type'] === 'row' ? 'horizontal' : 'vertical';

  const columnsLength = (isInitialized && data.blocks_layout.items.length) || 0;

  return (
    <div
      className={cx({
        one: columnsLength === 1,
        two: columnsLength === 2,
        three: columnsLength === 3,
        four: columnsLength === 4,
        rows: true,
      })}
    >
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      {selected && (
        <div className="toolbar">
          <Button.Group>
            <Button
              aria-label={`Add row element`}
              icon
              basic
              disabled={data?.blocks_layout?.items?.length >= maxRowLength}
              onClick={(e) => onAddNewBlock()}
            >
              <Icon name={addSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              aria-label={`Row block settings`}
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
      {!isInitialized && (
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
        isMainForm={false}
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
        <RowData {...props}></RowData>
      </SidebarPortal>
    </div>
  );
};

RowEdit.propTypes = {
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};

export default RowEdit;
