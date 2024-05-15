import React from 'react';
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
import { useDrag, useDrop } from 'react-aria';

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

  let { dragProps, isDragging } = useDrag({
    getItems() {
      return [
        {
          block: JSON.stringify({ id: block }),
        },
      ];
    },
  });

  let ref0 = React.useRef(null);
  let ref = React.useRef(null);

  let useDropHook = (ref) =>
    useDrop({
      ref,
      async onDrop(e) {
        let items = await Promise.all(
          e.items
            .filter((item) => item.kind === 'text' && item.types.has('block'))
            .map((item) => item.getText('block')),
        );
        const indexDraggable = properties.blocks_layout.items.indexOf(
          JSON.parse(items[0]).id,
        );
        let indexDroppable = properties.blocks_layout.items.indexOf(block);
        if (indexDroppable < indexDraggable) {
          indexDroppable += 1;
        }
        onMoveBlock(indexDraggable, indexDroppable);
      },
    });

  const makeDropTarget = ({ dropProps, isDropTarget }, theRef) => (
    <div
      {...dropProps}
      ref={theRef}
      style={{
        border: isDropTarget ? '1px solid blue' : '1px solid transparent',
        height: '30px',
        backgroundColor: 'paleturquoise',
      }}
    />
  );

  const DropTarget0 = () => makeDropTarget(useDropHook(ref0), ref0);
  const DropTarget = () => makeDropTarget(useDropHook(ref), ref);

  return (
    <div>
      <DropTarget0 />
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
        <DropTarget />
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
