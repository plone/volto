/**
 * Row component.
 * @module components/Row
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Tile } from '../../../components';

/**
 * Row component class.
 * @function Row
 * @param {Object} props Component properties.
 * @param {Object[]} props.tiles Tiles in the row.
 * @param {number} props.row Row index.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setHoverd Set hovered tile method.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Row = ({ tiles, row, selectTile, setHovered, setTileContent }) => (
  <Grid.Row>
    {tiles.map((tile, index) => (
      <Tile
        key={tile.url}
        row={row}
        column={index}
        selectTile={selectTile}
        setHovered={setHovered}
        setTileContent={setTileContent}
        {...tile}
      />
    ))}
  </Grid.Row>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Row.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.number.isRequired,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

export default Row;
