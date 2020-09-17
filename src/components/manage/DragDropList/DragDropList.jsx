import React from 'react';
import { isEmpty } from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DragDropList = (props) => {
  const { childList, renderChild, onMoveItem } = props;
  const [placeholderProps, setPlaceholderProps] = React.useState({});

  const handleDragStart = React.useCallback((event) => {
    const queryAttr = 'data-rbd-draggable-id';
    const domQuery = `[${queryAttr}='${event.draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft,
      ),
    });
  }, []);

  const onDragUpdate = React.useCallback((update) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const queryAttr = 'data-rbd-draggable-id';
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = update.source.index;
    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft,
      ),
    });
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const isMoved = onMoveItem(result);
        if (isMoved) setPlaceholderProps({});
      }}
      onDragStart={handleDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="edit-form">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ position: 'relative' }}
          >
            {childList.map(([childId, child], index) => (
              <Draggable draggableId={childId} index={index} key={childId}>
                {(draginfo) => renderChild(child, childId, index, draginfo)}
              </Draggable>
            ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && (
              <div
                style={{
                  position: 'absolute',
                  top: `${placeholderProps.clientY}px`,
                  height: `${placeholderProps.clientHeight + 18}px`,
                  background: '#eee',
                  width: `${placeholderProps.clientWidth}px`,
                  borderRadius: '3px',
                }}
              />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
