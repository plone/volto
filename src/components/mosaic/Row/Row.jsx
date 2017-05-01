/**
 * Row component.
 * @module components/Row
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Column } from '../../../components';

/**
 * Row component class.
 * @function Row
 * @param {Object} props Component properties.
 * @param {Object} props.columns Column data.
 * @param {number} props.row Row index.
 * @param {string} props.hovered Hovered state.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setHoverd Set hovered tile method.
 * @param {func} props.handleDrop Handle tile drop event.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the row.
 */
const Row = ({
  columns,
  row,
  hovered,
  selectTile,
  setHovered,
  handleDrop,
  setTileContent,
}) => (
  <Grid.Row className={hovered || ''}>
    {columns.map((column, index) => (
      <Column
        row={row}
        column={index}
        width={column.width}
        tiles={column.tiles}
        hovered={column.hovered}
        selectTile={selectTile}
        setHovered={setHovered}
        handleDrop={handleDrop}
        setTileContent={setTileContent}
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
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
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
Row.defaultProps = {
  hovered: null,
};

export default Row;
