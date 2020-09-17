import React from 'react';
import { EditBlock, DragDropList } from '@plone/volto/components';
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
import { settings } from '~/config';
import EditBlockWrapper from './EditBlockWrapper';

const BlocksForm = (props) => {
  const {
    pathname,
    onChangeField,
    properties,
    onChangeFormData,
    renderBlock,
    blockWrapper,
    selectedBlock,
    onSelectBlock,
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
      onAddBlock(settings.defaultBlockType, index + 1);
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

  const BlockWrapper = blockWrapper ? blockWrapper : EditBlockWrapper;

  return (
    <div className="ui container">
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
          // setState({ ...state, selected: selectPrev ? previous : null });
          return true;
        }}
        renderChild={(block, blockId, index, draginfo) =>
          renderBlock ? (
            renderBlock(block, blockId, index, draginfo)
          ) : (
            <BlockWrapper
              block={block}
              blockId={blockId}
              draginfo={draginfo}
              selected={selectedBlock === blockId}
            >
              <EditBlock
                block={blockId}
                data={block}
                handleKeyDown={handleKeyDown}
                id={blockId}
                index={index}
                key={blockId}
                onAddBlock={onAddBlock}
                onChangeBlock={onChangeBlock}
                onChangeField={onChangeField}
                onDeleteBlock={onDeleteBlock}
                onFocusNextBlock={onFocusNextBlock}
                onFocusPreviousBlock={onFocusPreviousBlock}
                onMoveBlock={onMoveBlock}
                onMutateBlock={onMutateBlock}
                onSelectBlock={onSelectBlock}
                pathname={pathname}
                properties={properties}
                selected={selectedBlock === blockId}
                type={block['@type']}
              />
            </BlockWrapper>
          )
        }
      />
    </div>
  );
};

export default BlocksForm;
