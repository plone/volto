import React, { useState } from 'react';
import { Icon } from '@plone/volto/components';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
} from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { BlockChooserButton } from '@plone/volto/components';
import { useDrag, useDrop, DragPreview, useButton } from 'react-aria';

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
    onMoveBlock,
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

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const classNames = buildStyleClassNamesFromData(data.styles);
  const style = buildStyleObjectFromData(data.styles);

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    style: { ...style },
  };

  const previewRef = React.useRef(null);
  const blockRef = React.useRef(null);

  // const onDragEnd = (evt, a, b, c) => {
  //   if (evt.dropOperation === 'move') {
  //     // Since the successful drag is already doing the move,
  //     // onDeleteBlock(block);
  //   }
  // };

  let { dragProps, dragButtonProps, isDragging } = useDrag({
    hasDragButton: true,
    preview: previewRef,
    // onDragEnd,
    getItems() {
      return [
        {
          // XXX No uppercase here, or you'll go crazy!
          blocktype: JSON.stringify({
            id: block,
            data,
          }),
        },
      ];
    },
  });

  const visible = selected && !hideHandler(data) && !isDragging;

  let buttonRef = React.useRef(null);
  let { buttonProps } = useButton(
    { ...dragButtonProps, elementType: 'div' },
    buttonRef,
  );

  const shouldItDropAfter = (y) =>
    y >= (blockRef.current ? blockRef.current.offsetHeight : 0) / 2;

  const getDropOperation = (types, allowedOperations) =>
    types.has('blocktype')
      ? allowedOperations.includes('move')
        ? 'move'
        : 'copy'
      : 'cancel';

  const onDrop = async (evt) => {
    let items = await Promise.all(
      evt.items
        .filter((item) => item.kind === 'text' && item.types.has('blocktype'))
        .map((item) => item.getText('blocktype')),
    );
    // for now we only support a single item
    if (items.length !== 1) {
      return;
    }
    const item = JSON.parse(items[0]);
    const indexDraggable = properties.blocks_layout.items.indexOf(item.id);
    let indexDroppable = properties.blocks_layout.items.indexOf(block);

    const dropAfter = shouldItDropAfter(evt.y);
    if (indexDraggable !== -1 && evt.dropOperation !== 'copy') {
      // in the same page
      if (dropAfter) {
        indexDroppable += 1;
      }
      if (indexDroppable > indexDraggable) {
        indexDroppable -= 1;
      }
      onMoveBlock(indexDraggable, indexDroppable);
    } else {
      // dropped from different page, or copied from same page
      onInsertBlock(
        properties.blocks_layout.items[
          dropAfter ? indexDroppable : indexDroppable - 1
        ],
        item.data,
      );
    }
  };

  const [isDroppingAfter, setIsDroppingAfter] = useState(false);

  const onDropEnter = (evt) => setIsDroppingAfter(shouldItDropAfter(evt.y));

  const onDropMove = (evt) => setIsDroppingAfter(shouldItDropAfter(evt.y));

  const { dropProps, isDropTarget } = useDrop({
    ref: blockRef,
    onDropEnter,
    onDropMove,
    getDropOperation,
    onDrop,
  });

  // const blockIndex = properties.blocks_layout.items.indexOf(block);

  return (
    <>
      <div
        className={`dnd-droptarget-indicator ${
          isDropTarget && !isDroppingAfter
            ? 'dnd-droptarget-indicator-before'
            : 'dnd-droptarget-indicator-inactive'
        }`}
      />
      <div
        className={`dnd-droptarget dnd-droptarget-margin-enclosure ${
          isDropTarget
            ? isDroppingAfter
              ? 'dnd-droptarget-accepting-after'
              : 'dnd-droptarget-accepting-before'
            : 'dnd-droptarget-inactive'
        } ${isDragging ? 'dnd-dragtarget-dragging' : ''}`}
        {...dropProps}
        ref={blockRef}
      >
        <div style={{ position: 'relative' }}>
          <div
            // Right now, we can have the alignment information in the styles property or in the
            // block data root, we inject the classname here for having control over the whole
            // Block Edit wrapper
            className={cx(`block-editor-${data['@type']}`, classNames, {
              [data.align]: data.align,
            })}
          >
            <div style={{ position: 'relative' }} />
            <div
              {...dragProps}
              {...styleMergedWithDragProps}
              style={{
                visibility: visible ? 'visible' : 'hidden',
                display: 'inline-block',
              }}
              className="drag handle wrapper"
            >
              <Icon
                name={dragSVG}
                size="18px"
                ref={buttonRef}
                {...buttonProps}
              />
            </div>
            <div
              className={`ui drag block inner ${type} dnd-droptarget-margin-enclosure`}
            >
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
        <DragPreview ref={previewRef}>
          {(items) => {
            const { '@type': type, plaintext: plainText } = JSON.parse(
              items[0]['blocktype'],
            ).data;
            return (
              <div className="dnd-preview">
                <div className="dnd-preview-blocktype">{type}</div>
                <div className="dnd-preview-plaintext">{plainText}</div>
              </div>
            );
          }}
        </DragPreview>
      </div>
      <div
        className={`dnd-droptarget-indicator ${
          isDropTarget && isDroppingAfter
            ? 'dnd-droptarget-indicator-after'
            : 'dnd-droptarget-indicator-inactive'
        }`}
      />
    </>
  );
};

export default injectIntl(EditBlockWrapper);
