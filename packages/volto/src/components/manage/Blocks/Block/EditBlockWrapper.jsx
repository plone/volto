import React, { useMemo, useCallback, useState } from 'react';
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
import { useDrag, useDrop, DragPreview } from 'react-aria';

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

  const visible = selected && !hideHandler(data);

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

  let { dragProps, isDragging } = useDrag({
    preview: previewRef,
    getItems() {
      console.log('drag', data);
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

  const blockRef = React.useRef(null);

  const shouldItDropAfter = (y) =>
    y >= (blockRef.current ? blockRef.current.offsetHeight : 0) / 2;

  const doDrop = useCallback(
    async (evt) => {
      let items = await Promise.all(
        evt.items
          .filter((item) => item.kind === 'text' && item.types.has('blocktype'))
          .map((item) => item.getText('blocktype')),
      );
      const indexDraggable = properties.blocks_layout.items.indexOf(
        JSON.parse(items[0]).id,
      );
      let indexDroppable = properties.blocks_layout.items.indexOf(block);

      const dropAfter = shouldItDropAfter(evt.y);

      if (dropAfter) {
        indexDroppable += 1;
      }
      if (indexDroppable > indexDraggable) {
        indexDroppable -= 1;
      }
      onMoveBlock(indexDraggable, indexDroppable);
    },
    [onMoveBlock, properties?.block_layout?.items],
  );

  const [isDropping, setIsDropping] = useState(false);
  const [isDroppingAfter, setIsDroppingAfter] = useState(false);

  const doDropEnter = useCallback(
    (evt) => {
      setIsDropping(true);
      setIsDroppingAfter(shouldItDropAfter(evt.y));
    },
    [setIsDropping, setIsDroppingAfter],
  );

  const doDropExit = useCallback(
    (evt) => {
      setIsDropping(false);
    },
    [setIsDropping],
  );

  const { dropProps, isDropTarget } = useDrop({
    ref: blockRef,
    onDropEnter(e) {
      doDropEnter(e);
    },
    onDropExit(e) {
      doDropExit(e);
    },
    async onDrop(e) {
      doDrop(e);
    },
  });

  const blockIndex = properties.blocks_layout.items.indexOf(block);

  return (
    <div
      style={isDragging ? { display: 'none' } : {}}
      className={
        isDropping
          ? isDroppingAfter
            ? 'dnd-droptarget-accepting-after'
            : 'dnd-droptarget-accepting-before'
          : 'dnd-droptarget-inactive'
      }
      {...dropProps}
      ref={blockRef}
    >
      <div
        {...dragProps}
        {...styleMergedWithDragProps}
        // Right now, we can have the alignment information in the styles property or in the
        // block data root, we inject the classname here for having control over the whole
        // Block Edit wrapper
        className={cx(`block-editor-${data['@type']}`, classNames, {
          [data.align]: data.align,
        })}
      >
        <div style={{ position: 'relative' }}>
          <div
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
  );
};

export default injectIntl(EditBlockWrapper);
