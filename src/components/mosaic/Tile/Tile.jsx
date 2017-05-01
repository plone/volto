/**
 * Tile component.
 * @module components/Tile
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';
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
 * @param {bool} props.first True if first item.
 * @param {bool} props.last True if last item.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.deleteTile Delete tile method.
 * @param {func} props.setHovered Set hovered tile method.
 * @param {func} props.handleDrop Handle tile drop event.
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
  deleteTile,
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
        {selected && <Label color="blue" pointing="below">{type}</Label>}
        {selected &&
          <Icon
            name="close"
            onClick={event => {
              event.stopPropagation();
              deleteTile(row, column, tile);
            }}
          />}
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
  deleteTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
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
      if (
        monitor.getItem().row === props.row &&
        monitor.getItem().column === props.column &&
        monitor.getItem().tile === props.tile
      ) {
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
      let type;
      if (Math.abs(xFactor) > Math.abs(yFactor)) {
        direction = xFactor > 0 ? 'right' : 'left';
        type = 'column';
      } else {
        direction = yFactor > 0 ? 'top' : 'bottom';
        type = (props.first && yFactor > 0.8) || (props.last && yFactor < -0.8)
          ? 'row'
          : 'tile';
      }
      props.setHovered(props.row, props.column, props.tile, type, direction);
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
        props.selectTile(-1, -1, -1);
        return {
          row: props.row,
          column: props.column,
          tile: props.tile,
        };
      },
      endDrag(props) {
        props.handleDrop(props.row, props.column, props.tile);
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(Tile),
);
