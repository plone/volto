/**
 * Grid component.
 * @module components/Grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid as UIGrid } from 'semantic-ui-react';
import { join, map } from 'lodash';

import { ColumnResizeHelper, Row } from '../../../components';

/**
 * Grid component class.
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
        key={join(
          map(row.columns, column =>
            join(map(column.tiles, tile => tile.url), '|'),
          ),
          '-',
        )}
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
  rows: PropTypes.arrayOf(PropTypes.shape({ columns: PropTypes.array }))
    .isRequired,
  selectTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
  startResize: PropTypes.func.isRequired,
  endResize: PropTypes.func.isRequired,
};

export default Grid;
