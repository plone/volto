import React from 'react';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import { Pluggable, Plug } from '@plone/volto/components/manage/Pluggable';
import MutateBlockButton from './MutateBlockButton';

import config from '@plone/volto/registry';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return !!data.fixed || !blockHasValue(data);
  };

  const { intl, blockProps, draginfo, children } = props;
  const { block, data, onDeleteBlock, selected, type } = blockProps;
  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={`quanta-block quanta-block-editor-${data['@type']}`}
    >
      {selected && (
        <div className="toolbar quanta-block-toolbar">
          <Pluggable name="block-toolbar" params={blockProps} />
          <Plug pluggable="block-toolbar" id="drag-handle">
            <Button
              style={{
                visibility: visible ? 'visible' : 'visible',
                display: 'inline-block',
              }}
              {...draginfo.dragHandleProps}
              icon
              basic
            >
              <Icon name={dragSVG} size="18px" />
            </Button>
          </Plug>
          <Plug pluggable="block-toolbar" id="mutate-block-button">
            <>
              <MutateBlockButton
                {...blockProps}
                onInsertBlock={(id, value) => {
                  blockProps.onSelectBlock(blockProps.onInsertBlock(id, value));
                }}
                className="quanta-block-add-button"
              />
              {!required && (
                <Button
                  icon
                  basic
                  onClick={() => onDeleteBlock(block)}
                  className="delete-button"
                  aria-label={intl.formatMessage(messages.delete)}
                >
                  <Icon name={trashSVG} size="18px" />
                </Button>
              )}
            </>
          </Plug>
        </div>
      )}
      <div className={`ui drag block inner ${type}`}>{children}</div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
