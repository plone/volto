import React, { useEffect, useMemo, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import find from 'lodash/find';
import min from 'lodash/min';
import { messages as defaultMessages } from '@plone/volto/helpers/MessageLabels/MessageLabels';

import { flattenTree, getProjection, removeChildrenOf } from './utilities';
import SortableItem from './SortableItem';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const messages = defineMessages({
  invalidBlockType: {
    id: 'You can not move this type of block to the new location',
    defaultMessage: 'You can not move this type of block to the new location',
  },
});

export function Order({
  items = [],
  onMoveBlock,
  onDeleteBlock,
  onSelectBlock,
  indentationWidth = 25,
  removable,
  dndKitCore,
  dndKitSortable,
  dndKitUtilities,
  errors,
}) {
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const intl = useIntl();

  const {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    MeasuringStrategy,
    defaultDropAnimation,
  } = dndKitCore;
  const { SortableContext, arrayMove, verticalListSortingStrategy } =
    dndKitSortable;
  const { CSS } = dndKitUtilities;

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const dropAnimationConfig = {
    keyframes({ transform }) {
      return [
        { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
        {
          opacity: 0,
          transform: CSS.Transform.toString({
            ...transform.final,
            x: transform.final.x + 5,
            y: transform.final.y + 5,
          }),
        },
      ];
    },
    easing: 'ease-out',
    sideEffects({ active }) {
      active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: defaultDropAnimation.duration,
        easing: defaultDropAnimation.easing,
      });
    },
  };

  const flattenedItems = useMemo(
    () =>
      removeChildrenOf(flattenTree(items), activeId ? [activeId] : []).filter(
        (item) => item.depth < 2,
      ),
    [activeId, items],
  );

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth,
          arrayMove,
        )
      : null;
  const sensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  const sensors = useSensors(useSensor(PointerSensor));

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems],
  );
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  return (
    <DndContext
      accessibility={{ announcements }}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(({ id, parentId, parentType, depth, data }) => (
          <SortableItem
            key={id}
            id={id}
            parentId={parentId}
            parentType={parentType}
            data={data}
            depth={min([
              id === activeId && projected ? projected.depth : depth,
              1,
            ])}
            indentationWidth={indentationWidth}
            onRemove={removable ? () => handleRemove(id) : undefined}
            onSelectBlock={onSelectBlock}
            errors={errors?.[id] || {}}
          />
        ))}
        {createPortal(
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId && activeItem ? (
              <SortableItem
                id={activeId}
                depth={activeItem.depth}
                clone
                data={find(flattenedItems, { id: activeId }).data}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragStart({ active: { id: activeId } }) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        parentType: activeItem.parentType,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }) {
    if (projected && over) {
      const { depth, parentId, parentType } = projected;
      const clonedItems = JSON.parse(JSON.stringify(flattenedItems));
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];
      const oldParentId = activeTreeItem.parentId;
      const oldParentType = activeTreeItem.parentType;

      clonedItems[activeIndex] = {
        ...activeTreeItem,
        depth,
        parentId,
        parentType,
      };

      // Translate position depending on parent
      if (parentId === oldParentId) {
        // Move from and to toplevel or move within the same sub block

        let destIndex = clonedItems[overIndex].index;
        if (clonedItems[overIndex].depth > clonedItems[activeIndex].depth) {
          destIndex = find(clonedItems, {
            id: clonedItems[overIndex].parentId,
          }).index;
        }
        onMoveBlock({
          source: {
            position: clonedItems[activeIndex].index,
            parent: oldParentId,
            id: active.id,
          },
          destination: {
            position: destIndex,
            parent: parentId,
          },
        });
      } else if (parentId && oldParentId) {
        // Move from one subblock to another

        if (parentType === oldParentType) {
          // Moving within the same type of subblock
          onMoveBlock({
            source: {
              position: clonedItems[activeIndex].index,
              parent: oldParentId,
              id: active.id,
            },
            destination: {
              position:
                overIndex < activeIndex
                  ? clonedItems[overIndex - 1].parentId
                    ? clonedItems[overIndex - 1].index + 1
                    : clonedItems[overIndex].index
                  : overIndex + 1 < clonedItems.length
                    ? clonedItems[overIndex + 1].index
                    : clonedItems[overIndex].index + 1,
              parent: parentId,
            },
          });
        } else {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(defaultMessages.error)}
              content={intl.formatMessage(messages.invalidBlockType)}
            />,
          );
        }
      } else if (oldParentId) {
        // Moving to the main container from a subblock

        if (oldParentType === 'gridBlock') {
          onMoveBlock({
            source: {
              position: clonedItems[activeIndex].index,
              parent: oldParentId,
              id: active.id,
            },
            destination: {
              position:
                overIndex > activeIndex
                  ? overIndex + 1 < clonedItems.length
                    ? clonedItems[overIndex + 1].index
                    : clonedItems[overIndex].index + 1
                  : clonedItems[overIndex].index,
              parent: parentId,
            },
          });
        } else {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(defaultMessages.error)}
              content={intl.formatMessage(messages.invalidBlockType)}
            />,
          );
        }
      } else {
        // Moving from the main container to a subblock

        if (parentType === 'gridBlock') {
          onMoveBlock({
            source: {
              position: clonedItems[activeIndex].index,
              parent: oldParentId,
              id: active.id,
            },
            destination: {
              position:
                overIndex < activeIndex
                  ? clonedItems[overIndex - 1].parentId
                    ? clonedItems[overIndex - 1].index + 1
                    : clonedItems[overIndex].index
                  : overIndex + 1 < clonedItems.length
                    ? clonedItems[overIndex + 1].index
                    : clonedItems[overIndex].index + 1,
              parent: parentId,
            },
          });
        } else {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(defaultMessages.error)}
              content={intl.formatMessage(messages.invalidBlockType)}
            />,
          );
        }
      }
    }

    resetState();
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id) {
    onDeleteBlock(id);
  }

  function getMovementAnnouncement(eventName, activeId, overId) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            parentType: projected.parentType,
            overId,
          });
        }
      }

      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}

export default injectLazyLibs([
  'dndKitCore',
  'dndKitSortable',
  'dndKitUtilities',
])(Order);
