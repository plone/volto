/**
 * Grid component.
 * @module components/Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid as UIGrid } from 'semantic-ui-react';

import { ColumnResizeHelper, Row } from '../../../components';

/**
 * Component to display a grid.
 * @function Grid
 * @param {Object} props Component properties.
 * @param {Object[]} props.rows Rows in the grid.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.deleteTile Delete tile method.
 * @param {func} props.setHovered Set hovered tile method.
 * @param {func} props.handleDrop Handle drop tile event.
 * @param {func} props.setTileContent Set tile content method.
 * @param {func} props.startResize Start resize method.
 * @param {func} props.endResize Start resize method.
 * @returns {string} Markup of the row.
 */
const Grid = ({
  rows,
  selectTile,
  deleteTile,
  setHovered,
  handleDrop,
  setTileContent,
  startResize,
  endResize,
}) => (
  <UIGrid className="mosaic">
    {rows.map((row, index) => (
      <Row
        row={index}
        selectTile={selectTile}
        deleteTile={deleteTile}
        setHovered={setHovered}
        handleDrop={handleDrop}
        setTileContent={setTileContent}
        columns={row.columns}
        hovered={row.hovered}
        resize={row.resize}
        startResize={startResize}
        endResize={endResize}
      />
    ))}
    <ColumnResizeHelper />
  </UIGrid>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Grid.propTypes = {
  /**
   * Rows in the grid
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Columns in the row
       */
      columns: PropTypes.array,
    }),
  ).isRequired,
  /**
   * Action to select a tile
   */
  selectTile: PropTypes.func.isRequired,
  /**
   * Actoin to delete a tile
   */
  deleteTile: PropTypes.func.isRequired,
  /**
   * Action to set the hovered state
   */
  setHovered: PropTypes.func.isRequired,
  /**
   * Action to handle the drop event
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
   * Handler called when resizig ends
   */
  endResize: PropTypes.func.isRequired,
};

export default Grid;
