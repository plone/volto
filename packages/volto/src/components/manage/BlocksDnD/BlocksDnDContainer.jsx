import React, { useState } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MeasuringStrategy,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import config from '@plone/volto/registry';

function BlocksDnDContainer({ children, onDragEnd, blocks }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const onDragStart = ({ active }) => setActiveId(active.id);
  const onDragCancel = () => setActiveId(null);

  return (
    <DndContext
      sensors={sensors}
      measuring={measuring}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
    >
      {children}
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: 100,
              height: 100,
              border: 'solid 1px rgb(130, 106, 106)',
              marginTop: '25px',
              marginLeft: '-10px',
            }}
          >
            <BodyClass className="dragging" />
            <div style={{ margin: '32px' }}>
              <Icon
                name={
                  config.blocks.blocksConfig[blocks[activeId]['@type']].icon
                }
                size="36px"
                color="rgb(130, 106, 106)"
              />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BlocksDnDContainer;
