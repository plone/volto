/**
 * Column resize helper.
 * @module components/mosaic/ColumnResizeHelper
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { map } from 'lodash';

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
/**
 * ColumnResizeHelper component class.
 * @function ColumnResizeHelper
 * @param {Object} props Component properties.
 * @param {Object} props.item Item to be dragged.
 * @param {string} props.itemType Item type to be dragged.
 * @param {Object} props.initialOffset Initial offset.
 * @param {Object} props.currentOffset Current offset.
 * @param {bool} props.isDragging Is dragging.
 * @returns {string} Markup of the component.
 */
export default class ColumnResizeHelper extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    item: PropTypes.shape(PropTypes.any),
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    isDragging: PropTypes.bool.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    item: null,
    itemType: null,
    initialOffset: null,
    currentOffset: null,
  };

  /**
   * Render method.
   * @function render
   * @returns {string} Markup of the container.
   */
  render() {
    const {
      isDragging,
      initialOffset,
      currentOffset,
      item,
      itemType,
    } = this.props;

    if (!isDragging || itemType !== 'column') {
      return <span />;
    }

    // Determine possible options
    const threeColOptions =
      item.column === 0 ? [0.25, 0.33, 0.5] : [0.5, 0.66, 0.75];
    const options =
      item.columns === 2 ? [0.25, 0.33, 0.5, 0.66, 0.75] : threeColOptions;

    // Calc percentage
    const percentage = (currentOffset.x - item.gridX) / item.gridWidth;

    // Calc difference for each option
    const diff = map(options, option => Math.abs(percentage - option));

    // Find best match
    const index = diff.indexOf(Math.min(...diff));

    return (
      <div
        className="resize helper"
        style={{
          top: initialOffset.y,
          left: item.gridX + options[index] * item.gridWidth,
          height: item.columnHeight,
        }}
      />
    );
  }
}
