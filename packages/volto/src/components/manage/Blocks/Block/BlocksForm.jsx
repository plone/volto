import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { cloneDeep, map } from 'lodash';
import EditBlock from './Edit';
import { DragDropList } from '@plone/volto/components';
import {
  getBlocks,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  applyBlockDefaults,
  getBlocksHierarchy,
} from '@plone/volto/helpers';
import {
  addBlock,
  insertBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  moveBlockEnhanced,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@plone/volto/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import { setSidebarTab, setUIState } from '@plone/volto/actions';
import { useDispatch } from 'react-redux';
import { useDetectClickOutside, useEvent } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { createPortal } from 'react-dom';

import Order from './Order/Order';

const BlocksForm = (props) => {
  const {
    pathname,
    onChangeField,
    properties,
    type,
    navRoot,
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
    isContainer,
    stopPropagation,
    disableAddBlockOnEnterKey,
    blocksConfig = config.blocks.blocksConfig,
    editable = true,
    direction = 'vertical',
    history,
    location,
    token,
    errors,
    blocksErrors,
  } = props;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const blockList = getBlocks(properties);

  const dispatch = useDispatch();
  const intl = useIntl();

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
      if (!disableAddBlockOnEnterKey) {
        onSelectBlock(onAddBlock(config.settings.defaultBlockType, index + 1));
      }
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
    const [newId, newFormData] = insertBlock(
      properties,
      id,
      value,
      current,
      config.experimental.addBlockButton.enabled ? 1 : 0,
    );

    const blocksFieldname = getBlocksFieldname(newFormData);
    const blockData = newFormData[blocksFieldname][newId];
    newFormData[blocksFieldname][newId] = applyBlockDefaults({
      data: blockData,
      intl,
      metadata,
      properties,
    });

    onChangeFormData(newFormData);
    return newId;
  };

  const onAddBlock = (type, index) => {
    if (editable) {
      const [id, newFormData] = addBlock(properties, type, index);
      const blocksFieldname = getBlocksFieldname(newFormData);
      const blockData = newFormData[blocksFieldname][id];
      newFormData[blocksFieldname][id] = applyBlockDefaults({
        data: blockData,
        intl,
        metadata,
        properties,
      });
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

  const onMoveBlockEnhanced = ({ source, destination }) => {
    const newFormData = moveBlockEnhanced(cloneDeep(properties), {
      source,
      destination,
    });
    const blocksFieldname = getBlocksFieldname(newFormData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(newFormData);
    let error = false;

    const allowedBlocks = Object.keys(blocksConfig);

    map(newFormData[blocksLayoutFieldname].items, (id) => {
      const block = newFormData[blocksFieldname][id];
      if (!allowedBlocks.includes(block['@type'])) {
        error = true;
      }
      if (Array.isArray(block[blocksLayoutFieldname]?.items)) {
        const size = block[blocksLayoutFieldname].items.length;
        const allowedSubBlocks = [
          ...(blocksConfig[block['@type']].allowedBlocks || allowedBlocks),
          'empty',
        ] || ['empty'];
        if (size < 1 || size > (blocksConfig[block['@type']].maxLength || 4)) {
          error = true;
        }
        map(block[blocksLayoutFieldname].items, (subId) => {
          const subBlock = block[blocksFieldname][subId];
          if (!allowedSubBlocks.includes(subBlock['@type'])) {
            error = true;
          }
        });
      }
    });

    if (!error) {
      onChangeFormData(newFormData);
      dispatch(
        setUIState({
          selected: null,
          multiSelected: [],
          gridSelected: null,
        }),
      );
    }
  };

  const defaultBlockWrapper = ({ draginfo }, editBlock, blockProps) => (
    <EditBlockWrapper draginfo={draginfo} blockProps={blockProps}>
      {editBlock}
    </EditBlockWrapper>
  );

  const editBlockWrapper = children || defaultBlockWrapper;

  // Remove invalid blocks on saving
  // Note they are alreaady filtered by DragDropList, but we also want them
  // to be removed when the user saves the page next. Otherwise the invalid
  // blocks would linger for ever.

  for (const [n, v] of blockList) {
    if (!v) {
      const newFormData = deleteBlock(properties, n);
      onChangeFormData(newFormData);
    }
  }

  useEvent('voltoClickBelowContent', () => {
    if (!config.experimental.addBlockButton.enabled || !isMainForm) return;
    onSelectBlock(
      onAddBlock(config.settings.defaultBlockType, blockList.length),
    );
  });

  return (
    <>
      {isMainForm &&
        isClient &&
        createPortal(
          <div>
            <Order
              items={getBlocksHierarchy(properties)}
              onMoveBlock={onMoveBlockEnhanced}
              onDeleteBlock={onDeleteBlock}
              onSelectBlock={onSelectBlock}
              removable
              errors={blocksErrors}
            />
          </div>,
          document.getElementById('sidebar-order'),
        )}
      <div
        className="blocks-form"
        role="presentation"
        ref={ref}
        onKeyDown={(e) => {
          if (stopPropagation) {
            e.stopPropagation();
          }
        }}
      >
        <fieldset className="invisible" disabled={!editable}>
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
            direction={direction}
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
                contentType: type,
                navRoot,
                blocksConfig,
                selected: selectedBlock === childId,
                multiSelected: multiSelected?.includes(childId),
                type: child['@type'],
                editable,
                showBlockChooser: selectedBlock === childId,
                detached: isContainer,
                // Properties to pass to the BlocksForm to match the View ones
                content: properties,
                history,
                location,
                token,
                errors,
                blocksErrors,
              };
              return editBlockWrapper(
                dragProps,
                <EditBlock key={childId} {...blockProps} />,
                blockProps,
              );
            }}
          </DragDropList>
        </fieldset>
      </div>
    </>
  );
};

export default BlocksForm;
