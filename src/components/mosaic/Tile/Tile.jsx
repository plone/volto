/**
 * Tile component.
 * @module components/Tile
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import Editor from 'draft-js-editor';

/* eslint jsx-a11y/no-static-element-interactions: 0 */

/**
 * Tile component class.
 * @function Tile
 * @param {Object} props Component properties.
 * @param {Object} props.content Content of the tile.
 * @param {string} props.type Type of the tile.
 * @param {bool} props.selected True if tile is selected.
 * @param {string} props.hovered Hovered direction.
 * @param {number} props.row Row index.
 * @param {number} props.column Column index.
 * @param {number} props.tile Tile index.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setHovered Set hovered tile method.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the tile.
 */
const Tile = ({
  content,
  type,
  selected,
  hovered,
  row,
  column,
  tile,
  selectTile,
  setTileContent,
  connectDragSource,
  connectDropTarget,
  isDragging,
}) =>
  connectDropTarget(
    connectDragSource(
      <div
        className={`tile ${selected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${hovered || ''}`}
        onClick={() => selectTile(row, column, tile)}
      >
        <Label color="blue" pointing="below">{type}</Label>
        {!__SERVER__ &&
          <Editor
            onChange={newContent =>
              setTileContent(row, column, tile, newContent)}
            editorState={content}
          />}
      </div>,
    ),
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tile.propTypes = {
  content: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  hovered: PropTypes.string,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  tile: PropTypes.number.isRequired,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

/**
 * Default props.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tile.defaultProps = {
  hovered: null,
};

export default DropTarget(
  'tile',
  {
    hover(props, monitor, component) {
      const dragRow = monitor.getItem().row;
      const dragColumn = monitor.getItem().column;
      const hoverRow = props.row;
      const hoverColumn = props.column;

      if (dragRow === hoverRow && dragColumn === hoverColumn) {
        return;
      }

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const height = hoverBoundingRect.top - hoverBoundingRect.bottom;
      const y = clientOffset.y - hoverBoundingRect.bottom - height / 2;
      const yFactor = y / (height / 2);

      const width = hoverBoundingRect.right - hoverBoundingRect.left;
      const x = clientOffset.x - hoverBoundingRect.left - width / 2;
      const xFactor = x / (width / 2);

      let direction;
      if (Math.abs(xFactor) > Math.abs(yFactor)) {
        direction = xFactor > 0 ? 'right' : 'left';
      } else {
        direction = yFactor > 0 ? 'top' : 'bottom';
      }
      if (props.hovered !== direction) {
        props.setHovered(props.row, props.column, props.tile, direction);
      }
    },
    drop(props) {
      props.setHovered(-1, -1, -1, null);
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'tile',
    {
      beginDrag(props) {
        props.selectTile(-1, -1);
        return {
          row: props.row,
          column: props.column,
          tile: props.tile,
        };
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(Tile),
);
