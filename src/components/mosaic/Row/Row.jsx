/**
 * Row component.
 * @module components/Row
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { join, map } from 'lodash';

import { Column, ColumnResize } from '../../../components';

/**
 * Row component class.
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
        key={`col-${join(map(column.tiles, tile => tile.url), '-')}`}
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
            key={`col-resize-${join(map(column.tiles, tile => tile.url), '-')}`}
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
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.number.isRequired,
  hovered: PropTypes.string,
  resize: PropTypes.bool.isRequired,
  selectTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
  startResize: PropTypes.func.isRequired,
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
