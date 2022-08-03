import React from 'react';
import EditBlock from './Edit';
import { DragDropList } from '@plone/volto/components';
import { getBlocks } from '@plone/volto/helpers';
import {
  addBlock,
  insertBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@plone/volto/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import { setSidebarTab } from '@plone/volto/actions';
import { useDispatch } from 'react-redux';
import { useDetectClickOutside } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import { useDndMonitor, DragOverlay } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from '../../BlocksDnD/SortableItem';

const Item = React.forwardRef(({ id, ...props }, ref) => {
  return (
    <div
      style={{
        backgroundColor: 'blue',
        height: '200px',
        marginBottom: '20px',
      }}
      {...props}
      ref={ref}
    >
      {id}
    </div>
  );
});

const BlocksForm = (props) => {
  const {
    pathname,
    onChangeField,
    properties,
    onChangeFormData,
    selectedBlock,
    multiSelected,
    onSelectBlock,
    allowedBlocks,
    showRestricted,
    title,
    description,
    metadata,
    manage,
    children,
    isMainForm = true,
    blocksConfig = config.blocks.blocksConfig,
    editable = true,
  } = props;

  const blockList = getBlocks(properties);

  const dispatch = useDispatch();

  const ClickOutsideListener = () => {
    onSelectBlock(null);
    dispatch(setSidebarTab(0));
  };

  const ref = useDetectClickOutside({
    onTriggered: ClickOutsideListener,
    triggerKeys: ['Escape'],
    // Disabled feature for now https://github.com/plone/volto/pull/2389#issuecomment-830027413
    disableClick: true,
    disableKeys: !isMainForm,
  });

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
    const isMultipleSelection = e.shiftKey;
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      onFocusPreviousBlock(block, node, isMultipleSelection);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      onFocusNextBlock(block, node, isMultipleSelection);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onFocusPreviousBlock = (
    currentBlock,
    blockNode,
    isMultipleSelection,
  ) => {
    const prev = previousBlockId(properties, currentBlock);
    if (prev === null) return;

    blockNode.blur();

    onSelectBlock(prev, isMultipleSelection);
  };

  const onFocusNextBlock = (currentBlock, blockNode, isMultipleSelection) => {
    const next = nextBlockId(properties, currentBlock);
    if (next === null) return;

    blockNode.blur();

    onSelectBlock(next, isMultipleSelection);
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onInsertBlock = (id, value, current) => {
    const [newId, newFormData] = insertBlock(properties, id, value, current);
    onChangeFormData(newFormData);
    return newId;
  };

  const onAddBlock = (type, index) => {
    if (editable) {
      const [id, newFormData] = addBlock(properties, type, index);
      onChangeFormData(newFormData);
      return id;
    }
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

  const [activeId, setActiveId] = React.useState(null);

  useDndMonitor({
    onDragStart(event) {
      const { active } = event;
      setActiveId(active.id);
    },
  });

  return (
    <div className="blocks-form" ref={ref}>
      <fieldset className="invisible" disabled={!editable}>
        <SortableContext
          items={properties.blocks_layout.items}
          strategy={verticalListSortingStrategy}
        >
          {blockList
            .filter(([id, child]) => id && child) // beware numbers!
            .map(([childId, child], index) => (
              <SortableItem
                key={childId}
                id={childId}
                child={child}
                index={index}
              >
                {(dragProps) => {
                  // debugger;
                  const { child, childId, index } = dragProps;
                  const blockProps = {
                    allowedBlocks,
                    showRestricted,
                    block: childId,
                    data: child,
                    handleKeyDown,
                    id: childId,
                    formTitle: title,
                    formDescription: description,
                    index,
                    manage,
                    onAddBlock,
                    onInsertBlock,
                    onChangeBlock,
                    onChangeField,
                    onChangeFormData,
                    onDeleteBlock,
                    onFocusNextBlock,
                    onFocusPreviousBlock,
                    onMoveBlock,
                    onMutateBlock,
                    onSelectBlock,
                    pathname,
                    metadata,
                    properties,
                    blocksConfig,
                    selected: selectedBlock === childId,
                    multiSelected: multiSelected?.includes(childId),
                    type: child['@type'],
                    editable,
                  };
                  return editBlockWrapper(
                    dragProps,
                    <EditBlock key={childId} {...blockProps} />,
                    blockProps,
                  );
                }}
              </SortableItem>
            ))}

          {/* {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))} */}
        </SortableContext>
        {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
        {/* <DragDropList
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
              showRestricted,
              block: childId,
              data: child,
              handleKeyDown,
              id: childId,
              formTitle: title,
              formDescription: description,
              index,
              manage,
              onAddBlock,
              onInsertBlock,
              onChangeBlock,
              onChangeField,
              onChangeFormData,
              onDeleteBlock,
              onFocusNextBlock,
              onFocusPreviousBlock,
              onMoveBlock,
              onMutateBlock,
              onSelectBlock,
              pathname,
              metadata,
              properties,
              blocksConfig,
              selected: selectedBlock === childId,
              multiSelected: multiSelected?.includes(childId),
              type: child['@type'],
              editable,
            };
            return editBlockWrapper(
              dragProps,
              <EditBlock key={childId} {...blockProps} />,
              blockProps,
            );
          }}
        </DragDropList> */}
      </fieldset>
    </div>
  );
};

export default BlocksForm;
