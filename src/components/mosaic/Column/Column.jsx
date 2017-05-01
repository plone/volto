/**
 * Column component.
 * @module components/Column
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Tile } from '../../../components';

/**
 * Column component class.
 * @function Column
 * @param {Object} props Component properties.
 * @param {number} props.width Column width.
 * @param {Array} props.tiles Array of tiles.
 * @param {number} props.row Row index.
 * @param {number} props.column Column index.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setHoverd Set hovered tile method.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Column = ({
  width,
  tiles,
  row,
  column,
  selectTile,
  setHovered,
  setTileContent,
}) => (
  <Grid.Column width={width}>
    {tiles.map((tile, index) => (
      <Tile
        key={tile.url}
        row={row}
        column={column}
        tile={index}
        selectTile={selectTile}
        setHovered={setHovered}
        setTileContent={setTileContent}
        url={tile.url}
        content={tile.content}
        type={tile.type}
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
  width: PropTypes.number.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      content: PropTypes.object,
      type: PropTypes.type,
    }),
  ).isRequired,
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

export default Column;
