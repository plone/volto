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

/**
 * ColumnResize component class.
 * @class ColumnResize
 * @extends Component
 */
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
export default class ColumnResize extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    startResize: PropTypes.func.isRequired,
    endResize: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
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
