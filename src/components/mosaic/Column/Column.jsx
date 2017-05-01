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
 * @param {string} props.hovered Hovered state.
 * @param {func} props.selectTile Select tile method.
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
        setHovered={setHovered}
        handleDrop={handleDrop}
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
  hovered: PropTypes.string,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
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
