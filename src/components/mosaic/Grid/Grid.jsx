/**
 * Grid component.
 * @module components/Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid as UIGrid } from 'semantic-ui-react';

import { Row } from '../../../components';

/**
 * Grid component class.
 * @function Grid
 * @param {Object} props Component properties.
 * @param {Object[]} props.rows Rows in the grid.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setHovered Set hovered tile method.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Grid = ({ rows, selectTile, setHovered, setTileContent }) => (
  <UIGrid>
    {rows.map((row, index) => (
      <Row
        key={row}
        row={index}
        selectTile={selectTile}
        setHovered={setHovered}
        setTileContent={setTileContent}
        tiles={row}
      />
    ))}
  </UIGrid>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Grid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

export default Grid;
