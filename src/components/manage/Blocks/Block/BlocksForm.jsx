import React from 'react';
import EditBlock from './Edit';
import { DragDropList } from '@plone/volto/components';
import { getBlocks } from '@plone/volto/helpers';
import {
  addBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@plone/volto/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import config from '@plone/volto/registry';

const BlocksForm = (props) => {
  const {
    pathname,
    onChangeField,
    metadata,
    properties,
    onChangeFormData,
    selectedBlock,
    onSelectBlock,
    allowedBlocks,
    title,
    description,
    manage,
    children,
  } = props;

  const blockList = getBlocks(properties);

  const handleKeyDown = (
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) => {
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onFocusPreviousBlock = (currentBlock, blockNode) => {
    const prev = previousBlockId(properties, currentBlock);
    if (prev === null) return;

    blockNode.blur();

    onSelectBlock(prev);
  };

  const onFocusNextBlock = (currentBlock, blockNode) => {
    const next = nextBlockId(properties, currentBlock);
    if (next === null) return;

    blockNode.blur();

    onSelectBlock(next);
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onAddBlock = (type, index) => {
    const [id, newFormData] = addBlock(properties, type, index);
    onChangeFormData(newFormData);
    return id;
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(properties, id);

    const newFormData = deleteBlock(properties, id);
    onChangeFormData(newFormData);

    onSelectBlock(selectPrev ? previous : null);
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    const newFormData = moveBlock(properties, dragIndex, hoverIndex);
    onChangeFormData(newFormData);
  };

  const defaultBlockWrapper = ({ draginfo }, editBlock, blockProps) => (
    <EditBlockWrapper draginfo={draginfo} blockProps={blockProps}>
      {editBlock}
    </EditBlockWrapper>
  );

  const editBlockWrapper = children || defaultBlockWrapper;

  return (
    <div className="blocks-form" title={title}>
      <DragDropList
        childList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          const newFormData = moveBlock(
            properties,
            source.index,
            destination.index,
          );
          onChangeFormData(newFormData);
          return true;
        }}
      >
        {(dragProps) => {
          const { child, childId, index } = dragProps;
          const blockProps = {
            allowedBlocks,
            block: childId,
            data: child,
            handleKeyDown,
            id: childId,
            index,
            manage,
            onAddBlock,
            onChangeBlock,
            onChangeField,
            onDeleteBlock,
            onFocusNextBlock,
            onFocusPreviousBlock,
            onMoveBlock,
            onMutateBlock,
            onSelectBlock,
            pathname,
            metadata,
            properties,
            selected: selectedBlock === childId,
            type: child['@type'],
          };
          return editBlockWrapper(
            dragProps,
            <EditBlock
              key={childId}
              {...blockProps}
              formTitle={title}
              formDescription={description}
            />,
            blockProps,
          );
        }}
      </DragDropList>
    </div>
  );
};

export default BlocksForm;
