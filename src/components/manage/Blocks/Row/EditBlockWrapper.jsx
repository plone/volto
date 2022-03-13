import React from 'react';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import { Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import NewBlockAddButton from './NewBlockAddButton';
import cx from 'classnames';

import clearSVG from '@plone/volto/icons/clear.svg';
import dragSVG from '@plone/volto/icons/drag.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const intl = useIntl();
  const hideHandler = (data) => {
    return !!data.fixed || !(blockHasValue(data) && props.blockProps.editable);
  };

  const { blockProps, draginfo, children } = props;
  const {
    block,
    selected,
    type,
    blocksConfig,
    onChangeBlock,
    onDeleteBlock,
    onSelectBlock,
    data,
  } = blockProps;

  const visible = selected && !hideHandler(data);

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={`block-editor-${data['@type']}`}
    >
      <div style={{ position: 'relative' }}>
        <Button
          basic
          icon
          onClick={() => onDeleteBlock(block, true)}
          className="remove-block-button"
          aria-label={intl.formatMessage(messages.delete)}
        >
          <Icon name={clearSVG} className="circled" size="24px" />
        </Button>
        <div {...draginfo.dragHandleProps} className="drag row handle wrapper">
          <Icon name={dragSVG} size="18px" />
        </div>
        {type ? (
          <div className={`ui drag block inner ${type}`}>{children}</div>
        ) : (
          <div
            className={cx('row-empty-placeholder', {
              selected: selected,
            })}
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBlock(block);
            }}
          >
            <p>Add a new block</p>
            <NewBlockAddButton
              block={block}
              blocksConfig={blocksConfig}
              onMutateBlock={(block, value) =>
                onChangeBlock(block, {
                  ...data,
                  ...value,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBlockWrapper;
