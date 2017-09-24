/**
 * Contents index header component.
 * @module components/manage/Contents/ContentsIndexHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

const widthValues = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fiveteen',
  'sixteen',
];

/**
 * Component to display a folder contents index header.
 * @function ContentsIndexHeaderComponent
 * @returns {string} Markup of the component.
 */
export const ContentsIndexHeaderComponent = ({
  width,
  label,
  connectDragSource,
  connectDropTarget,
  isDragging,
}) =>
  connectDropTarget(
    connectDragSource(
      <th
        className={`${widthValues[width - 1]} wide`}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        {label}
      </th>,
    ),
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ContentsIndexHeaderComponent.propTypes = {
  /**
   * Width of the column
   */
  width: PropTypes.number.isRequired,
  /**
   * Label of the column
   */
  label: PropTypes.string.isRequired,
  /**
   * Handler to connect a drag source
   */
  connectDragSource: PropTypes.func.isRequired,
  /**
   * Handler to connect a drop source
   */
  connectDropTarget: PropTypes.func.isRequired,
  /**
   * Dragging state
   */
  isDragging: PropTypes.bool.isRequired,
  /**
   * Index number of the column
   */
  order: PropTypes.number.isRequired,
  /**
   * Action called when ordering a column
   */
  onOrderIndex: PropTypes.func.isRequired,
};

export default DropTarget(
  'index',
  {
    hover(props, monitor) {
      const dragOrder = monitor.getItem().order;
      const hoverOrder = props.order;

      if (dragOrder === hoverOrder) {
        return;
      }

      props.onOrderIndex(dragOrder, hoverOrder - dragOrder);

      monitor.getItem().order = hoverOrder;
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'index',
    {
      beginDrag(props) {
        return {
          id: props.label,
          order: props.order,
        };
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(ContentsIndexHeaderComponent),
);
