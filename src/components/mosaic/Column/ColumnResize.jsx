/**
 * Column resize.
 * @module components/mosaic/ColumnResize
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { map } from 'lodash';

@DragSource(
  'column',
  {
    beginDrag(props, monitor, component) {
      const column = findDOMNode(component);
      const grid = column.parentNode.parentNode;
      const gridRect = grid.getBoundingClientRect();
      props.startResize(props.row);
      return {
        row: props.row,
        column: props.column,
        columns: props.columns,
        columnHeight: column.getBoundingClientRect().height,
        gridWidth: gridRect.width,
        gridX: gridRect.left,
        gridY: gridRect.top,
      };
    },
    endDrag(props, monitor) {
      const item = monitor.getItem();
      const currentOffset = monitor.getSourceClientOffset();

      const threeColOptions =
        props.column === 0 ? [0.25, 0.33, 0.5] : [0.5, 0.67, 0.75];
      const options =
        props.columns === 2 ? [0.25, 0.33, 0.5, 0.67, 0.75] : threeColOptions;

      const percentage = (currentOffset.x - item.gridX) / item.gridWidth;
      const diff = map(options, option => Math.abs(percentage - option));
      const index = diff.indexOf(Math.min(...diff));

      props.endResize(props.row, props.column, index);
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)
/**
 * Component to display a column resize handle.
 * @class ColumnResize
 * @extends Component
 */
export default class ColumnResize extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Row index in the grid
     */
    row: PropTypes.number.isRequired,
    /**
     * Column index in the row
     */
    column: PropTypes.number.isRequired,
    /**
     * Number of columns
     */
    columns: PropTypes.number.isRequired,
    /**
     * Is currently dragging state
     */
    isDragging: PropTypes.bool.isRequired,
    /**
     * Handler called when the resize is starting
     */
    startResize: PropTypes.func.isRequired,
    /**
     * Handler called when the resize ends
     */
    endResize: PropTypes.func.isRequired,
    /**
     * Handler to connect a drag source
     */
    connectDragSource: PropTypes.func.isRequired,
    /**
     * Handler to connect a drag preview
     */
    connectDragPreview: PropTypes.func.isRequired,
  };

  /**
   * Component did mount
   * @method componentDidMount
   */
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  /**
   * Render method.
   * @function render
   * @returns {string} Markup of the container.
   */
  render() {
    return this.props.connectDragSource(
      <div className={`divider${this.props.isDragging ? ' resizing' : ''}`}>
        <div className="inner" />
      </div>,
    );
  }
}
