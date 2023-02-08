import React from 'react';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import NewBlockAddButton from './NewBlockAddButton';
import cx from 'classnames';

import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const intl = useIntl();

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

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      {...draginfo.dragHandleProps}
      className={cx(`block-editor-${data['@type']}`, { selected })}
    >
      <div
        role="presentation"
        className="cell-wrapper"
        onClick={(e) => {
          onSelectBlock(block);
        }}
      >
        <Button
          basic
          icon
          onClick={() => onDeleteBlock(block, true)}
          className="remove-block-button"
          aria-label={intl.formatMessage(messages.delete)}
        >
          <Icon name={clearSVG} className="circled" size="24px" />
        </Button>

        {type && type !== 'empty' ? (
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
