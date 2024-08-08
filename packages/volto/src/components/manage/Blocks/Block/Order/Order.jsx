import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { find, min } from 'lodash';

import { flattenTree, getProjection, removeChildrenOf } from './utilities';
import SortableItem from './SortableItem';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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
    () => removeChildrenOf(flattenTree(items), activeId ? [activeId] : []),
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
        {flattenedItems.map(({ id, parentId, depth, data }) => (
          <SortableItem
            key={id}
            id={id}
            parentId={parentId}
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
      const { depth, parentId } = projected;
      const clonedItems = JSON.parse(JSON.stringify(flattenedItems));
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];
      const oldParentId = activeTreeItem.parentId;

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      // Translate position depending on parent
      if (parentId === oldParentId) {
        // Move from and to toplevel or move within the same grid block

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
        // Move from one gridblock to another

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
      } else if (oldParentId) {
        // Moving to the main container from a gridblock

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
        // Moving from the main container to a gridblock

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
