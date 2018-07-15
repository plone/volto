/**
 * Tile component.
 * @module components/Tile
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import Editor from 'draft-js-plugins-editor';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

/* eslint jsx-a11y/no-static-element-interactions: 0 */

/**
 * Tile component class.
 * @function Tile
 * @param {Object} props Component properties.
 * @param {Object} props.content Content of the tile.
 * @param {string} props.type Type of the tile.
 * @param {string} props.label Label of the tile.
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
 * @param {bool} props.isDragging Is dragging.
 * @returns {string} Markup of the tile.
 */
const Tile = ({
  content,
  type,
  label,
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
        className={`tile ${type}${hovered ? ` ${hovered}` : ''}${
          selected ? ' selected' : ''
        }${isDragging ? ' dragging' : ''}`}
        onClick={() => selectTile(row, column, tile)}
      >
        {selected && (
          <Label color="blue" pointing="below">
            {label}
          </Label>
        )}
        {selected && (
          <Icon
            name="close"
            onClick={event => {
              event.stopPropagation();
              deleteTile(row, column, tile);
            }}
          />
        )}
        {!__SERVER__ && (
          <Editor
            onChange={newContent =>
              setTileContent(row, column, tile, newContent)
            }
            editorState={content}
            plugins={[inlineToolbarPlugin]}
          />
        )}
      </div>,
    ),
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tile.propTypes = {
  /**
   * Content of the tile
   */
  content: PropTypes.object.isRequired,
  /**
   * Type of the tile
   */
  type: PropTypes.string.isRequired,
  /**
   * Label of the tile
   */
  label: PropTypes.string.isRequired,
  /**
   * Selected state of the tile
   */
  selected: PropTypes.bool.isRequired,
  /**
   * Hovered state of the tile (left, right, top, bottom or none)
   */
  hovered: PropTypes.string,
  /**
   * Index of the row in the grid
   */
  row: PropTypes.number.isRequired,
  /**
   * Index of the column in the row
   */
  column: PropTypes.number.isRequired,
  /**
   * Index of the tile in the column
   */
  tile: PropTypes.number.isRequired,
  /**
   * Action to select a tile
   */
  selectTile: PropTypes.func.isRequired,
  /**
   * Action to delete a tile
   */
  deleteTile: PropTypes.func.isRequired,
  /**
   * Action to set the hovered state
   */
  setHovered: PropTypes.func.isRequired,
  /**
   * Action to handle a drop
   */
  handleDrop: PropTypes.func.isRequired,
  /**
   * Action to set the tile content
   */
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
        type =
          (props.first && yFactor > 0.8) || (props.last && yFactor < -0.8)
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
