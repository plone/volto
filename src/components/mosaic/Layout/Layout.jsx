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
import { isEqual, map, reduce, remove } from 'lodash';
import move from 'lodash-move';
import { v4 as uuid } from 'uuid';

import { Grid, Editbar } from '../../../components';

const tileTypes = {
  title: {
    label: 'Title',
    content: content => `<h1>${content}</h1>`,
  },
  description: {
    label: 'Description',
    content: content => `<p class="description">${content}</p>`,
  },
  text: {
    label: 'Text',
    content: content => content,
  },
};

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
    }),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    layout: {
      rows: [
        {
          columns: [
            {
              width: 16,
              tiles: [
                {
                  content: 'My first blog post',
                  url: './@@plone.app.standardtiles.html/1',
                  type: 'title',
                },
                {
                  content:
                    'Fusce imperdiet risus turpis, a facilisis dui pharetra sit amet. Maecenas ut malesuada diam. Nulla porta ut dui in ultrices. Maecenas eget dictum tortor, vulputate vulputate mi. Aenean pulvinar a est et sagittis. Nam at venenatis nunc. Pellentesque quis porta enim.',
                  url: './@@plone.app.standardtiles.html/2',
                  type: 'description',
                },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: 8,
              tiles: [
                {
                  content:
                    '<h2>Nam et convallis lorem</h2><p>Suspendisse vestibulum quis lorem in luctus. Cras consequat sit amet elit aliquam rhoncus. Nunc quis faucibus orci, vitae gravida risus. Nulla semper nisi velit, et ullamcorper magna volutpat eget. Nam euismod libero sit amet arcu imperdiet, quis malesuada metus congue. Sed magna massa, gravida a ornare eu, suscipit auctor nisl. Nulla laoreet dolor ut viverra consectetur. Praesent aliquet ante sit amet ante maximus aliquet. Integer a ex vel nisl cursus interdum. Donec sollicitudin venenatis leo at rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim augue ac neque ornare, sed venenatis augue dignissim. Pellentesque gravida vel arcu quis venenatis.</p><p></p><p>Fusce imperdiet risus turpis, a facilisis dui pharetra sit amet. Maecenas ut malesuada diam. Nulla porta ut dui in ultrices. Maecenas eget dictum tortor, vulputate vulputate mi. Aenean pulvinar a est et sagittis. Nam at venenatis nunc. Pellentesque quis porta enim.</p>',
                  url: './@@plone.app.standardtiles.html/4',
                  type: 'text',
                },
              ],
            },
            {
              width: 8,
              tiles: [
                {
                  content:
                    '<h2>Nam euismod libero sit amet</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a augue eget dui dignissim hendrerit vitae eget velit. Aenean nec rhoncus turpis. Nullam varius magna metus, nec elementum leo ornare ac. Nam tincidunt vel ex id consectetur. Curabitur faucibus et ante nec molestie. Sed eget fringilla mi. Sed sed tristique tellus.</p><p>Nam et convallis lorem. Suspendisse finibus erat quis erat consectetur ultricies. Nulla mattis arcu nec dignissim pharetra. Ut fermentum ipsum eget ante consectetur eleifend. Nulla commodo pellentesque rhoncus. Nunc vitae odio sed dui aliquam gravida gravida sit amet ante. Integer aliquam aliquet cursus. Nam convallis laoreet nunc ut dictum.</p><p>Quisque fermentum, ligula quis venenatis sagittis, eros nisl scelerisque lorem, eget mollis tellus ex ut purus. Vivamus ut imperdiet odio. Integer sodales suscipit mauris eget tristique. Proin non tellus tempus felis lacinia blandit a at erat. Suspendisse at elit sodales, malesuada eros at, pulvinar nisl. Mauris at odio lacinia, placerat tellus sit amet, luctus est. Ut sit amet ligula pharetra, dignissim augue nec, volutpat eros.</p>',
                  url: './@@plone.app.standardtiles.html/3',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: 16,
              tiles: [
                {
                  content:
                    '<h2>Quisque fermentum</h2><ul><li>Ligula quis venenatis sagittis</li><li>Eros nisl scelerisque lorem</li><li>Eget mollis tellus ex ut purus</li><li>Vivamus ut imperdiet odio</li><li>Integer sodales suscipit mauris eget tristique.</li><li>Proin non tellus tempus felis lacinia blandit a at erat</li><li>Suspendisse at elit sodales</li><li>Malesuada eros at, pulvinar nisl.</li><li>Mauris at odio lacinia, placerat tellus sit amet, luctus est.</li><li>Ut sit amet ligula pharetra, dignissim augue nec, volutpat eros.</li></ul>',
                  url: './@@plone.app.standardtiles.html/10',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
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
          resize: false,
          hovered: null,
          columns: map(row.columns, (column, columnIndex) => ({
            width: column.width,
            hovered: null,
            tiles: map(column.tiles, (tile, tileIndex) => ({
              url: tile.url,
              type: tile.type,
              label: tileTypes[tile.type].label,
              content: __SERVER__
                ? tile.content
                : EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                      convertFromHTML(
                        tileTypes[tile.type].content(tile.content),
                      ),
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
        type: '',
        direction: '',
      },
    };
    this.selectTile = this.selectTile.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
    this.setHovered = this.setHovered.bind(this);
    this.setTileContent = this.setTileContent.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.startResize = this.startResize.bind(this);
    this.endResize = this.endResize.bind(this);
    this.deselectOnDocumentClick = this.deselectOnDocumentClick.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.insertTile = this.insertTile.bind(this);
  }

  /**
   * Component did mount
   * @function componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.deselectOnDocumentClick);
  }

  /**
   * Component will unmount
   * @function componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.deselectOnDocumentClick);
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
   * @param {string} type Selected type (row/column/tile).
   * @param {string} direction Direction.
   * @returns {undefined}
   */
  setHovered(row, column, tile, type, direction) {
    if (
      isEqual(this.state.hovered, {
        row,
        column,
        tile,
        type,
        direction,
      })
    ) {
      return;
    }

    // Deselect
    if (this.state.hovered.row !== -1) {
      switch (this.state.hovered.type) {
        case 'tile':
          this.state.layout.rows[this.state.hovered.row].columns[
            this.state.hovered.column
          ].tiles[this.state.hovered.tile].hovered = null;
          break;
        case 'column':
          this.state.layout.rows[this.state.hovered.row].columns[
            this.state.hovered.column
          ].hovered = null;
          break;
        default:
          this.state.layout.rows[this.state.hovered.row].hovered = null;
          break;
      }
    }

    // Select new
    if (row !== -1) {
      switch (type) {
        case 'tile':
          this.state.layout.rows[row].columns[column].tiles[
            tile
          ].hovered = direction;
          break;
        case 'column':
          this.state.layout.rows[row].columns[column].hovered = direction;
          break;
        default:
          this.state.layout.rows[row].hovered = direction;
          break;
      }
    }

    this.setState({
      hovered: {
        row,
        column,
        tile,
        type,
        direction,
      },
      layout: this.state.layout,
    });
  }

  /**
   * Handle drop.
   * @function handleDrop
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} tile Tile index.
   * @returns {undefined}
   */
  handleDrop(row, column, tile) {
    const hovered = {
      ...this.state.hovered,
    };
    const offset =
      hovered.direction === 'bottom' || hovered.direction === 'right' ? 1 : 0;
    let removed;

    // Reset hovered
    this.setHovered(-1, -1, -1, '', '');

    switch (hovered.type) {
      case 'tile':
        // If source and target tile in the same column
        if (hovered.row === row && hovered.column === column) {
          // Move tile in column
          this.state.layout.rows[hovered.row].columns[
            hovered.column
          ].tiles = move(
            this.state.layout.rows[row].columns[column].tiles,
            tile,
            hovered.tile + offset,
          );
        } else {
          // Insert tile in new column
          this.state.layout.rows[hovered.row].columns[
            hovered.column
          ].tiles.splice(
            hovered.tile + offset,
            0,
            this.state.layout.rows[row].columns[column].tiles[tile],
          );
          // Remove tile in old column
          this.state.layout.rows[row].columns[column].tiles.splice(tile, 1);
        }
        break;
      case 'column':
        if (
          this.state.layout.rows[hovered.row].columns.length < 4 ||
          (hovered.row === row &&
            this.state.layout.rows[row].columns[column].tiles.length === 1)
        ) {
          // Remove tile from old position
          removed = this.state.layout.rows[row].columns[column].tiles.splice(
            tile,
            1,
          );
          // Add tile in new column
          this.state.layout.rows[hovered.row].columns.splice(
            hovered.column + offset,
            0,
            {
              width: this.state.layout.rows[row].columns[column].width,
              hovered: null,
              tiles: removed,
            },
          );
        }
        break;
      default:
        // Remove tile from old position
        removed = this.state.layout.rows[row].columns[column].tiles.splice(
          tile,
          1,
        );
        // Add tile in new column
        this.state.layout.rows.splice(hovered.row + offset, 0, {
          hovered: null,
          columns: [
            {
              width: 16,
              hovered: null,
              tiles: removed,
            },
          ],
        });
        break;
    }

    // Clean up layout
    this.cleanupLayout();

    // Set new state
    this.setState({
      layout: this.state.layout,
    });
  }

  /**
   * Cleanup layout.
   * @function cleanupLayout
   * @returns {undefined}
   */
  cleanupLayout() {
    // Clean up empty columns
    for (let row = 0; row < this.state.layout.rows.length; row += 1) {
      remove(
        this.state.layout.rows[row].columns,
        column => column.tiles.length === 0,
      );
    }

    // Clean up empty rows
    remove(this.state.layout.rows, row => row.columns.length === 0);

    // Resize columns
    for (let row = 0; row < this.state.layout.rows.length; row += 1) {
      if (
        reduce(
          map(this.state.layout.rows[row].columns, column => column.width),
          (x, y) => x + y,
        ) !== 16
      ) {
        switch (this.state.layout.rows[row].columns.length) {
          case 1:
            this.state.layout.rows[row].columns[0].width = 16;
            break;
          case 2:
            this.state.layout.rows[row].columns[0].width = 8;
            this.state.layout.rows[row].columns[1].width = 8;
            break;
          case 3:
            this.state.layout.rows[row].columns[0].width = 5;
            this.state.layout.rows[row].columns[1].width = 6;
            this.state.layout.rows[row].columns[2].width = 5;
            break;
          default:
            this.state.layout.rows[row].columns[0].width = 4;
            this.state.layout.rows[row].columns[1].width = 4;
            this.state.layout.rows[row].columns[2].width = 4;
            this.state.layout.rows[row].columns[3].width = 4;
            break;
        }
      }
    }

    // Set new state
    this.setState({
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
   * Delete tile.
   * @function deleteTile
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} tile Tile index.
   * @returns {undefined}
   */
  deleteTile(row, column, tile) {
    this.selectTile(-1, -1, -1);
    this.state.layout.rows[row].columns[column].tiles.splice(tile, 1);
    this.cleanupLayout();
  }

  /**
   * Start resize.
   * @function startResize
   * @param {number} row Row index.
   * @returns {undefined}
   */
  startResize(row) {
    this.selectTile(-1, -1, -1);
    this.state.layout.rows[row].resize = true;
    this.setState({
      layout: this.state.layout,
    });
  }

  /**
   * End resize.
   * @function endResize
   * @param {number} row Row index.
   * @param {number} column Column index.
   * @param {number} position New position.
   * @returns {undefined}
   */
  endResize(row, column, position) {
    let layout;

    if (this.state.layout.rows[row].columns.length === 2) {
      layout = [[4, 12], [5, 11], [8, 8], [11, 5], [12, 4]][position];
    } else if (column === 0) {
      layout = [[4, 8, 4], [5, 6, 5], [8, 4, 4]][position];
    } else {
      layout = [[4, 4, 8], [5, 6, 5], [4, 8, 4]][position];
    }
    map(layout, (width, index) => {
      this.state.layout.rows[row].columns[index].width = width;
    });

    this.state.layout.rows[row].resize = false;
    this.setState({
      layout: this.state.layout,
    });
  }

  /**
   * Handle ref
   * @function handleRef
   * @param {Object} node Ref object.
   * @returns {undefined}
   */
  handleRef(node) {
    this.ref = node;
  }

  /**
   * Deselect on document click method.
   * @function deselectOnDocumentClick
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  deselectOnDocumentClick(event) {
    if (this.ref && !this.ref.contains(event.target)) {
      this.selectTile(-1, -1, -1);
    }
  }

  /**
   * Insert a tile.
   * @function insertTile
   * @param {string} type Type of tile.
   * @returns {undefined}
   */
  insertTile(type) {
    this.state.layout.rows.push({
      resize: false,
      hovered: null,
      columns: [
        {
          width: 16,
          hovered: null,
          tiles: [
            {
              url: uuid(),
              type,
              label: tileTypes[type].label,
              content: EditorState.createWithContent(
                ContentState.createFromBlockArray(convertFromHTML('<p></p>')),
              ),
              selected: true,
              hovered: null,
            },
          ],
        },
      ],
    });
    this.setState({
      layout: this.state.layout,
    });
    this.selectTile(this.state.layout.rows.length - 1, 0, 0);
  }

  /**
   * Render method.
   * @function render
   * @returns {string} Markup of the container.
   */
  render() {
    return (
      <div ref={this.handleRef}>
        <Grid
          rows={this.state.layout.rows}
          selectTile={this.selectTile}
          deleteTile={this.deleteTile}
          setHovered={this.setHovered}
          handleDrop={this.handleDrop}
          setTileContent={this.setTileContent}
          startResize={this.startResize}
          endResize={this.endResize}
        />
        <Editbar insertTile={this.insertTile} />
      </div>
    );
  }
}
