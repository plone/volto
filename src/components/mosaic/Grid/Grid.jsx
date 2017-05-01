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
 * @param {func} props.handleDrop Handle drop tile event.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Grid = ({ rows, selectTile, setHovered, handleDrop, setTileContent }) => (
  <UIGrid className="mosaic">
    {rows.map((row, index) => (
      <Row
        row={index}
        selectTile={selectTile}
        setHovered={setHovered}
        handleDrop={handleDrop}
        setTileContent={setTileContent}
        columns={row.columns}
        hovered={row.hovered}
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
  rows: PropTypes.arrayOf(PropTypes.shape({ columns: PropTypes.array }))
    .isRequired,
  selectTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

export default Grid;
