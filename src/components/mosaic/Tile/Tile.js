/**
 * Tile component.
 * @module components/Tile
 */

import React, { PropTypes } from 'react';

import { Editor } from 'components';

import styles from './Tile.scss';

/**
 * Tile component class.
 * @function Tile
 * @param {Object} props Component properties.
 * @param {Object} props.content Content of the tile.
 * @param {number} props.width Width of the tile.
 * @param {bool} props.selected True if tile is selected.
 * @param {number} props.row Row index.
 * @param {number} props.column Column index.
 * @param {func} props.selectTile Select tile method.
 * @param {func} props.setTileContent Set tile content method.
 * @returns {string} Markup of the tile.
 */
const Tile = ({ content, width, row, column, selected, selectTile, setTileContent }) =>
  <div className={`${styles.tile} col-xs-${width} ${selected ? styles.selected : ''}`}>
    <div onClick={() => selectTile(row, column)} className={styles.content}>
      <Editor content={content} setContent={newContent => setTileContent(row, column, newContent)} />
    </div>
  </div>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tile.propTypes = {
  content: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  selectTile: PropTypes.func.isRequired,
  setTileContent: PropTypes.func.isRequired,
};

export default Tile;
