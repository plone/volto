import { useSortable } from '@dnd-kit/sortable';
import { useDndContext } from '@dnd-kit/core';
import { Icon } from '@plone/volto/components';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
} from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import config from '@plone/volto/registry';
import cx from 'classnames';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { BlockChooserButton } from '@plone/volto/components';

import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { intl, blockProps, children } = props;
  const {
    allowedBlocks,
    block,
    blocksConfig,
    selected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    data,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
  } = blockProps;

  const { attributes, listeners, setNodeRef, transition } = useSortable({
    id: block,
  });
  const { over, active } = useDndContext();
  const overIndex = over?.id
    ? over?.data.current.sortable.items.indexOf(over?.id)
    : -1;
  const activeIndex = active?.id
    ? active?.data.current.sortable.items.indexOf(active?.id)
    : -1;
  const border = activeIndex !== overIndex && over?.id === block;

  const transitionStyle = {
    transition,
    borderTop: border && overIndex < activeIndex ? 'solid 3px blue' : null,
    borderBottom: border && overIndex > activeIndex ? 'solid 3px blue' : null,
    marginTop: border && overIndex < activeIndex ? '-3px' : null,
    marginBottom: border && overIndex > activeIndex ? '-3px' : null,
    opacity: active?.id === block ? 0.2 : null,
  };

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const classNames = buildStyleClassNamesFromData(data.styles);
  const style = buildStyleObjectFromData(data.styles);

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    style: { ...style, ...transitionStyle },
  };

  return (
    <div
      className={cx(`block-editor-${data['@type']}`, classNames, {
        [data.align]: data.align,
      })}
      ref={setNodeRef}
      style={styleMergedWithDragProps ? styleMergedWithDragProps : null}
    >
      <div style={{ position: 'relative', marginBottom: '2em' }}>
        <div
          {...listeners}
          {...attributes}
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>
          {children}
          {selected && !required && editable && (
            <Button
              icon
              basic
              onClick={() => onDeleteBlock(block, true)}
              className="delete-button"
              aria-label={intl.formatMessage(messages.delete)}
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
          {config.experimental.addBlockButton.enabled && showBlockChooser && (
            <BlockChooserButton
              data={data}
              block={block}
              onInsertBlock={(id, value) => {
                if (blockHasValue(data)) {
                  onSelectBlock(onInsertBlock(id, value));
                } else {
                  onChangeBlock(id, value);
                }
              }}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
              blocksConfig={blocksConfig}
              size="24px"
              properties={properties}
              navRoot={navRoot}
              contentType={contentType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
