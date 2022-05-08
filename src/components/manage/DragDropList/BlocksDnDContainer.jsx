import React, { useRef } from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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

const BlocksDnDContainer = (props) => {
  const { children, onMoveItem, reactBeautifulDnd } = props; //renderChild
  const { DragDropContext } = reactBeautifulDnd;
  const [placeholderProps, setPlaceholderProps] = React.useState({});

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

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  );
};

export default injectLazyLibs(['reactBeautifulDnd'])(BlocksDnDContainer);
