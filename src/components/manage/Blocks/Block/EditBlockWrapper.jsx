import React from 'react';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import config from '@plone/volto/registry';

import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const { intl, blockProps, draginfo, children } = props;
  const { block, selected, type, onDeleteBlock, data } = blockProps;
  const visible = selected && blockHasValue(data) && !data?.fixed;

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={`block-editor-${data['@type']}`}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...draginfo.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>{children}</div>

        {selected && !required && (
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
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
