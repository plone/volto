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
    layout: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          width: PropTypes.number,
          content: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
    ).isRequired,
  };

  /**
   * Construcor
   * @param {Object} props Properties.
   * @constructs
   */
  constructor(props) {
    super(props);
    this.state = {
      layout: this.props.layout.map((row, rowIndex) =>
        row.map((tile, tileIndex) => ({
          width: tile.width,
          type: tile.type,
          content: __SERVER__
            ? tile.content
            : EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(tile.content),
                ),
              ),
          selected: rowIndex === 0 && tileIndex === 0,
          hovered: null,
        })),
      ),
      selected: {
        row: 0,
        column: 0,
      },
      hovered: {
        row: -1,
        column: -1,
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
   * @param {Object} content New content.
   * @returns {undefined}
   */
  setTileContent(row, column, content) {
    this.setState({
      layout: this.state.layout.map((rowList, rowIndex) =>
        rowList.map((tile, tileIndex) => {
          if (rowIndex === row && tileIndex === column) {
            return {
              ...tile,
              content,
            };
          }
          return tile;
        }),
      ),
    });
  }

  /**
   * Set hovered.
   * @function setHovered
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {string} direction Direction.
   * @returns {undefined}
   */
  setHovered(row, column, direction) {
    if (this.state.hovered.row !== -1) {
      this.state.layout[this.state.hovered.row][
        this.state.hovered.column
      ].hovered = null;
    }
    if (row !== -1) {
      this.state.layout[row][column].hovered = direction;
    }
    this.setState({
      hovered: {
        row,
        column,
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
   * @returns {undefined}
   */
  selectTile(row, column) {
    if (this.state.selected.row !== -1) {
      this.state.layout[this.state.selected.row][
        this.state.selected.column
      ].selected = false;
    }
    if (row !== -1) {
      this.state.layout[row][column].selected = true;
    }
    this.setState({
      selected: {
        row,
        column,
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
    const { layout } = this.state;
    const rows = layout.map(row =>
      row.map(tile => ({
        width: tile.width,
        type: tile.type,
        content: tile.content,
        selected: tile.selected,
        hovered: tile.hovered,
      })),
    );

    return (
      <Grid
        rows={rows}
        selectTile={this.selectTile}
        setHovered={this.setHovered}
        setTileContent={this.setTileContent}
      />
    );
  }
}
