/**
 * Row component.
 * @module components/Row
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Column, ColumnResize } from '../../../components';

/**
 * Component to displa a row.
 * @function Row
 * @param {Object} props Component properties.
 * @param {Object} props.columns Column data.
 * @param {number} props.row Row index.
 * @param {string} props.hovered Hovered state.
 * @param {string} props.resize Resize state.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.deleteTile Delete tile method.
 * @param {func} props.setHoverd Set hovered tile method.
 * @param {func} props.handleDrop Handle tile drop event.
 * @param {func} props.setTileContent Set tile content method.
 * @param {func} props.startResize Start resize method.
 * @param {func} props.endResize Start resize method.
 * @returns {string} Markup of the row.
 */
const Row = ({
  columns,
  row,
  hovered,
  resize,
  selectTile,
  deleteTile,
  setHovered,
  handleDrop,
  setTileContent,
  startResize,
  endResize,
}) => (
  <Grid.Row className={`${hovered || ''}${resize ? ' resize' : ''}`}>
    {columns.map((column, index) => [
      <Column
        row={row}
        column={index}
        width={column.width}
        tiles={column.tiles}
        hovered={column.hovered}
        selectTile={selectTile}
        deleteTile={deleteTile}
        setHovered={setHovered}
        handleDrop={handleDrop}
        setTileContent={setTileContent}
      />,
      index < columns.length - 1 &&
        columns.length < 4 && (
          <ColumnResize
            row={row}
            column={index}
            columns={columns.length}
            startResize={startResize}
            endResize={endResize}
          />
        ),
    ])}
  </Grid.Row>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Row.propTypes = {
  /**
   * Column in the row
   */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Row index in the grid
   */
  row: PropTypes.number.isRequired,
  /**
   * Hovered state (left, right, top, bottom or none)
   */
  hovered: PropTypes.string,
  /**
   * State if column in row is being resized
   */
  resize: PropTypes.bool.isRequired,
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
  /**
   * Handler called when resizing starts
   */
  startResize: PropTypes.func.isRequired,
  /**
   * Handler called when resizing ends
   */
  endResize: PropTypes.func.isRequired,
};

/**
 * Default props.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Row.defaultProps = {
  hovered: null,
};

export default Row;
