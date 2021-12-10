import React, { useRef } from 'react';
import { isEmpty } from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

const getPlaceholder = (draggedDOM, sourceIndex, destinationIndex) => {
  // Because of the margin rendering rules, there is no easy
  // way to calculate the offset of the placeholder.
  //
  // (Note that this is the reason we cannot use the solutions
  // published on the net, because they assume that we are in control
  // of the content and there are no additional margins involved.)
  //
  // To get a placeholder that looks good in all cases, we
  // fill up the space between the previous and the next element.
  const childrenArray = [...draggedDOM.parentNode.children];
  // Remove the source element
  childrenArray.splice(sourceIndex, 1);
  // Also remove the placeholder that the library always inserts at the end
  childrenArray.splice(-1, 1);
  const parentRect = draggedDOM.parentNode.getBoundingClientRect();
  const prevNode = childrenArray[destinationIndex - 1];
  const nextNode = childrenArray[destinationIndex];
  let top, bottom;
  if (prevNode) {
    const prevRect = prevNode.getBoundingClientRect();
    top = prevRect.top + prevRect.height - parentRect.top;
  } else {
    top = 0;
  }
  if (nextNode) {
    const nextRect = nextNode.getBoundingClientRect();
    bottom = nextRect.top - parentRect.top;
  } else {
    bottom =
      parentRect.bottom +
      draggedDOM.getBoundingClientRect().height -
      parentRect.top;
  }
  return {
    clientY: top,
    clientHeight: bottom - top,
    clientX: parseFloat(
      window.getComputedStyle(draggedDOM.parentNode).paddingLeft,
    ),
    clientWidth: draggedDOM.clientWidth,
  };
};

const DragDropList = (props) => {
  const {
    childList,
    children,
    onMoveItem,
    as = 'div',
    style,
    forwardedAriaLabelledBy,
  } = props; //renderChild
  const [placeholderProps, setPlaceholderProps] = React.useState({});
  const [uid] = React.useState(uuid());
  // queueing timed action
  const timer = useRef(null);

  const onDragStart = React.useCallback((event) => {
    clearTimeout(timer.current);
    const queryAttr = 'data-rbd-draggable-id';
    const domQuery = `[${queryAttr}='${event.draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    if (!draggedDOM) {
      return;
    }
    const sourceIndex = event.source.index;
    setPlaceholderProps(getPlaceholder(draggedDOM, sourceIndex, sourceIndex));
  }, []);

  const onDragEnd = React.useCallback(
    (result) => {
      clearTimeout(timer.current);
      onMoveItem(result);
      setPlaceholderProps({});
    },
    [onMoveItem],
  );

  const onDragUpdate = React.useCallback((update) => {
    clearTimeout(timer.current);
    setPlaceholderProps({});
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const queryAttr = 'data-rbd-draggable-id';
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    if (!draggedDOM) {
      return;
    }
    const sourceIndex = update.source.index;
    const destinationIndex = update.destination.index;
    // Wait until the animations have finished, to make it look good.
    timer.current = setTimeout(
      () =>
        setPlaceholderProps(
          getPlaceholder(draggedDOM, sourceIndex, destinationIndex),
        ),
      250,
    );
  }, []);

  const AsDomComponent = as;
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={uid}>
        {(provided, snapshot) => (
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
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
