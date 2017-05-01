/**
 * Layout container.
 * @module containers/Layout
 */

/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertFromHTML, EditorState, ContentState } from 'draft-js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { map } from 'lodash';

import { Grid } from '../../../components';

/**
 * Layout component class.
 * @class Layout
 * @extends Component
 */
@DragDropContext(HTML5Backend)
export default class Layout extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    layout: PropTypes.shape({
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          columns: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              tiles: PropTypes.arrayOf(
                PropTypes.shape({
                  content: PropTypes.string,
                  url: PropTypes.string,
                  type: PropTypes.string,
                }),
              ),
            }),
          ),
        }),
      ),
    }).isRequired,
  };

  /**
   * Construcor
   * @param {Object} props Properties.
   * @constructs
   */
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        rows: map(this.props.layout.rows, (row, rowIndex) => ({
          columns: map(row.columns, (column, columnIndex) => ({
            width: column.width,
            tiles: map(column.tiles, (tile, tileIndex) => ({
              url: tile.url,
              type: tile.type,
              content: __SERVER__
                ? tile.content
                : EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                      convertFromHTML(tile.content),
                    ),
                  ),
              selected: rowIndex === 0 && columnIndex === 0 && tileIndex === 0,
              hovered: null,
            })),
          })),
        })),
      },
      selected: {
        row: 0,
        column: 0,
        tile: 0,
      },
      hovered: {
        row: -1,
        column: -1,
        tile: -1,
        direction: '',
      },
    };
    this.selectTile = this.selectTile.bind(this);
    this.setHovered = this.setHovered.bind(this);
    this.setTileContent = this.setTileContent.bind(this);
  }

  /**
   * Set tile content.
   * @function setTileContent
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} tile Tile index.
   * @param {Object} content New content.
   * @returns {undefined}
   */
  setTileContent(row, column, tile, content) {
    this.state.layout.rows[row].columns[column].tiles[tile].content = content;

    this.setState({
      layout: this.state.layout,
    });
  }

  /**
   * Set hovered.
   * @function setHovered
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} tile Column index.
   * @param {string} direction Direction.
   * @returns {undefined}
   */
  setHovered(row, column, tile, direction) {
    if (this.state.hovered.row !== -1) {
      this.state.layout.rows[this.state.hovered.row].columns[
        this.state.hovered.column
      ].tiles[this.state.hovered.tile].hovered = null;
    }
    if (row !== -1) {
      this.state.layout.rows[row].columns[column].tiles[
        tile
      ].hovered = direction;
    }
    this.setState({
      hovered: {
        row,
        column,
        tile,
        direction,
      },
      layout: this.state.layout,
    });
  }

  /**
   * Select tile.
   * @function selectTile
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} tile Tile index.
   * @returns {undefined}
   */
  selectTile(row, column, tile) {
    if (this.state.selected.row !== -1) {
      this.state.layout.rows[this.state.selected.row].columns[
        this.state.selected.column
      ].tiles[this.state.selected.tile].selected = false;
    }
    if (row !== -1) {
      this.state.layout.rows[row].columns[column].tiles[tile].selected = true;
    }
    this.setState({
      selected: {
        row,
        column,
        tile,
      },
      layout: this.state.layout,
    });
  }

  /**
   * Render method.
   * @function render
   * @returns {string} Markup of the container.
   */
  render() {
    return (
      <Grid
        rows={this.state.layout.rows}
        selectTile={this.selectTile}
        setHovered={this.setHovered}
        setTileContent={this.setTileContent}
      />
    );
  }
}
