import React, { useState } from 'react';
import { isEmpty, pickBy } from 'lodash';
import { BlocksForm, SidebarPortal, Icon } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Button, Grid, Ref } from 'semantic-ui-react';
import GridData from './Data';
import EditBlockWrapper from './EditBlockWrapper';
import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';

import TemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';
import QuantaEditBlockWrapper from '../Block/QuantaEditBlockWrapper';

import addSVG from '@plone/volto/icons/add.svg';
import configSVG from '@plone/volto/icons/configuration.svg';
import circleDownSVG from '@plone/volto/icons/circle-bottom.svg';
import circleRightSVG from '@plone/volto/icons/circle-right.svg';

import templates from './templates';

import config from '@plone/volto/registry';

function getBlockConfig(type) {
  return config.blocks.blocksConfig?.[type];
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
    id,
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
  const data_blocks = data?.data?.blocks;
  const properties = isEmpty(data_blocks) ? emptyBlocksForm() : data.data;
  const blockConfig = getBlockConfig(data['@type']);
  const allowedBlocks = blockConfig.allowedBlocks;
  const maxRowLength = blockConfig.maxRowLength;

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

  const onAddNewBlock = () => {
    const newuuid = uuid();
    const type = allowedBlocks?.length === 1 ? allowedBlocks[0] : null;
    const newFormData = {
      ...data.data,
      blocks: {
        ...data.data.blocks,
        [newuuid]: {
          ...(type && { '@type': type }),
        },
      },
      blocks_layout: {
        items: [...data.data.blocks_layout.items, newuuid],
      },
    };
    if (data.data.blocks_layout.items.length < maxRowLength) {
      onChangeBlock(block, {
        ...data,
        data: newFormData,
      });
    }
  };

  const onSelectTemplate = (templateIndex) => {
    const resultantTemplates =
      allowedBlocks?.length === 1 ? templates(allowedBlocks[0]) : templates();
    onChangeBlock(block, {
      ...data,
      data: resultantTemplates(intl)[templateIndex].blocksData,
    });
  };

  const onToggleDirection = () => {
    onChangeBlock(block, {
      ...data,
      '@type': data['@type'] === 'row' ? 'column' : 'row',
    });
  };

  const allowedBlocksConfig = pickBy(config.blocks.blocksConfig, (value, key) =>
    allowedBlocks.includes(key),
  );

  const direction = data['@type'] === 'row' ? 'horizontal' : 'vertical';

  return (
    <div
      className={cx({
        one: data?.data && data.data.blocks_layout.items.length === 1,
        two: data?.data && data.data.blocks_layout.items.length === 2,
        three: data?.data && data.data.blocks_layout.items.length === 3,
        four: data?.data && data.data.blocks_layout.items.length === 4,
        rows: true,
      })}
    >
      {selected && (
        <div className="toolbar">
          <Button.Group>
            <Button
              aria-label={`Add row element`}
              icon
              basic
              disabled={
                data?.data?.blocks_layout?.items?.length >= maxRowLength
              }
              onClick={(e) => onAddNewBlock()}
            >
              <Icon name={addSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              aria-label={`Toggle`}
              icon
              basic
              onClick={(e) => onToggleDirection()}
            >
              <Icon
                name={
                  direction === 'horizontal' ? circleDownSVG : circleRightSVG
                }
                size="24px"
              />
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
      {isEmpty(data_blocks) && (
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
        blocksFormId={id}
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
          <QuantaEditBlockWrapper draginfo={draginfo} blockProps={blockProps}>
            {editBlock}
          </QuantaEditBlockWrapper>
        )}
      </BlocksForm>
      <SidebarPortal selected={selected}>
        <GridData {...props}></GridData>
      </SidebarPortal>
    </div>
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
