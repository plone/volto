import React, { useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { v4 as uuid } from 'uuid';

const getVerticalPlaceholder = (
  draggedDOM,
  sourceIndex,
  destinationIndex,
  parentDOM,
) => {
  // Because of the margin rendering rules, there is no easy
  // way to calculate the offset of the placeholder.
  //
  // (Note that this is the reason we cannot use the solutions
  // published on the net, because they assume that we are in control
  // of the content and there are no additional margins involved.)
  //
  // To get a placeholder that looks good in all cases, we
  // fill up the space between the previous and the next element.
  const childrenArray = [...parentDOM.children];
  // Remove the source element
  childrenArray.splice(sourceIndex, 1);
  // Also remove the placeholder that the library always inserts at the end
  childrenArray.splice(-1, 1);
  const parentRect = parentDOM.getBoundingClientRect();
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
    clientX: parseFloat(window.getComputedStyle(parentDOM).paddingLeft),
    clientWidth: draggedDOM.clientWidth,
  };
};

const getHorizontalPlaceholder = (draggedDOM, destinationIndex, parentDOM) => {
  // The next element will be the one with a gray placeholder behind it.
  //
  // If the element is the last (doesn't have a next element), the whole draggable
  // area will be highlighted

  const parentRect = parentDOM.getBoundingClientRect();
  let height;

  height = parentRect.bottom - parentRect.top;

  let clientWidth = draggedDOM.clientWidth;

  let innerDroppablePlaceholderMarginLeft =
    parentDOM.children[destinationIndex].getBoundingClientRect().x;
  if (parentDOM.children.length - 1 === destinationIndex) {
    innerDroppablePlaceholderMarginLeft = parentRect.x;
    clientWidth = parentDOM.getBoundingClientRect().width;
  }
  return {
    clientY: 0,
    clientHeight: height,
    clientX: parseFloat(innerDroppablePlaceholderMarginLeft - parentRect.x),
    clientWidth: clientWidth,
  };
};

const DragDropList = (props) => {
  const {
    childList,
    children,
    direction = 'vertical',
    onMoveItem,
    as = 'div',
    style,
    forwardedAriaLabelledBy,
    reactBeautifulDnd,
  } = props; //renderChild
  const { DragDropContext, Draggable, Droppable } = reactBeautifulDnd;
  const [placeholderProps, setPlaceholderProps] = React.useState({});
  const [uid] = React.useState(uuid());
  // queueing timed action
  const timer = useRef(null);
  const parentRef = useRef(null);
  const onDragStart = React.useCallback(
    (event) => {
      clearTimeout(timer.current);
      const queryAttr = 'data-rbd-draggable-id';
      const domQuery = `[${queryAttr}='${event.draggableId}']`;
      const draggedDOM = document.querySelector(domQuery);
      if (!draggedDOM) {
        return;
      }
      const sourceIndex = event.source.index;
      setPlaceholderProps(
        direction === 'horizontal'
          ? getHorizontalPlaceholder(draggedDOM, sourceIndex, parentRef.current)
          : getVerticalPlaceholder(
              draggedDOM,
              sourceIndex,
              sourceIndex,
              parentRef.current,
            ),
      );
    },
    [direction],
  );

  const onDragEnd = React.useCallback(
    (result) => {
      clearTimeout(timer.current);
      onMoveItem(result);
      setPlaceholderProps({});
    },
    [onMoveItem],
  );

  const onDragUpdate = React.useCallback(
    (update) => {
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
      timer.current = setTimeout(() => {
        setPlaceholderProps(
          direction === 'horizontal'
            ? getHorizontalPlaceholder(
                draggedDOM,
                destinationIndex,
                parentRef.current,
              )
            : getVerticalPlaceholder(
                draggedDOM,
                sourceIndex,
                destinationIndex,
                parentRef.current,
              ),
        );
      }, 250);
    },
    [direction],
  );

  const AsDomComponent = as;
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId={uid}
        direction={direction}
        renderClone={(provided, snapshot, rubric) => {
          const index = rubric.source.index;
          return children({
            child: childList[index][1],
            childId: childList[index][0],
            index,
            draginfo: provided,
          });
        }}
      >
        {(provided, snapshot) => (
          <AsDomComponent
            ref={(el) => {
              provided.innerRef(el);
              parentRef.current = el;
            }}
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
                  ...(direction === 'horizontal' && { zIndex: -1 }),
                }}
              />
            )}
          </AsDomComponent>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default injectLazyLibs(['reactBeautifulDnd'])(DragDropList);
