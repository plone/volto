/**
 * Column component.
 * @module components/Column
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Tile } from '../../../components';

/**
 * Component to display a column.
 * @function Column
 * @param {Object} props Component properties.
 * @param {number} props.width Column width.
 * @param {Array} props.tiles Array of tiles.
 * @param {number} props.row Row index.
 * @param {number} props.column Column index.
 * @param {string} props.hovered Hovered state.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.deleteTile Delete tile method.
 * @param {func} props.setHovered Set hovered tile method.
 * @param {func} props.handleDrop Handle tile drop event.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Column = ({
  width,
  tiles,
  row,
  column,
  hovered,
  selectTile,
  deleteTile,
  setHovered,
  handleDrop,
  setTileContent,
}) => (
  <Grid.Column width={width} className={hovered || ''}>
    {tiles.map((tile, index) => (
      <Tile
        key={tile.url}
        row={row}
        column={column}
        tile={index}
        first={index === 0}
        last={index === tiles.length - 1}
        selectTile={selectTile}
        deleteTile={deleteTile}
        setHovered={setHovered}
        handleDrop={handleDrop}
        setTileContent={setTileContent}
        url={tile.url}
        content={tile.content}
        type={tile.type}
        label={tile.label}
        selected={tile.selected}
        hovered={tile.hovered}
      />
    ))}
  </Grid.Column>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Column.propTypes = {
  /**
   * Width of the column
   */
  width: PropTypes.number.isRequired,
  /**
   * Tiles in the column
   */
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Url of the tile
       */
      url: PropTypes.string,
      /**
       * Content of the tile
       */
      content: PropTypes.object,
      /**
       * Type of the tile
       */
      type: PropTypes.string,
      /**
       * Label of the tile
       */
      label: PropTypes.string,
    }),
  ).isRequired,
  /**
   * Column index in the row
   */
  column: PropTypes.number.isRequired,
  /**
   * Row index in the grid
   */
  row: PropTypes.number.isRequired,
  /**
   * Hovered state of the tile (left, right, top, bottom or none)
   */
  hovered: PropTypes.string,
  /**
   * Action to select a tile
   */
  selectTile: PropTypes.func.isRequired,
  /**
   * Action to delete a tile
   */
  deleteTile: PropTypes.func.isRequired,
  /**
   * Action to set the hovered tile
   */
  setHovered: PropTypes.func.isRequired,
  /**
   * Action to handle a drop
   */
  handleDrop: PropTypes.func.isRequired,
  /**
   * Action to set tile content
   */
  setTileContent: PropTypes.func.isRequired,
};

/**
 * Default props.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Column.defaultProps = {
  hovered: null,
};

export default Column;
