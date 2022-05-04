import { isEmpty } from 'lodash';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const BlocksDnDList = (props) => {
  const {
    childList,
    children,
    as = 'div',
    style,
    forwardedAriaLabelledBy,
    placeholderProps,
    reactBeautifulDnd,
  } = props; //renderChild
  const { Draggable, Droppable } = reactBeautifulDnd;

  const AsDomComponent = as;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <Droppable droppableId="main">
      {(provided, snapshot) => (
        <SortableContext
          items={childList}
          strategy={verticalListSortingStrategy}
        >
          <AsDomComponent
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ ...style, position: 'relative' }}
            aria-labelledby={forwardedAriaLabelledBy}
          >
            {childList
              .filter(([id, child]) => id && child) // beware numbers!
              .map(([childId, child], index) => (
                <Draggable
                  draggableId={childId.toString()}
                  index={index}
                  key={childId}
                  style={{
                    userSelect: 'none',
                  }}
                >
                  {(draginfo) => children({ child, childId, index, draginfo })}
                </Draggable>
              ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                style={{
                  position: 'absolute',
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  background: '#eee',
                  width: placeholderProps.clientWidth,
                  borderRadius: '3px',
                }}
              />
            )}
          </AsDomComponent>
        </SortableContext>
      )}
    </Droppable>
  );
};

export default injectLazyLibs(['reactBeautifulDnd'])(BlocksDnDList);
