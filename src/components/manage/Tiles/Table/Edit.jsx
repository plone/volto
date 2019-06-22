/**
 * Edit table tile.
 * @module components/manage/Tiles/Table/Edit
 */

import React, { Component } from 'react';
import { map, omit } from 'lodash';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import cx from 'classnames';

const initialTable = {
  celled: true,
  rows: [
    {
      type: 'header',
      cells: [
        {
          type: 'header',
          value: 'Header',
        },
        {
          type: 'header',
          value: 'Header',
        },
      ],
    },
    {
      type: 'body',
      cells: [
        {
          type: 'data',
          value: 'Cell',
        },
        {
          type: 'data',
          value: 'Cell',
        },
      ],
    },
  ],
};

/**
 * Edit table tile class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.onAddColumn = this.onAddColumn.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.data.table) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        table: initialTable,
      });
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.table) {
      this.props.onChangeTile(nextProps.tile, {
        ...nextProps.data,
        table: initialTable,
      });
    }
  }

  /**
   * Add column handler
   * @method onAddColumn
   * @param {string} code New value html
   * @returns {undefined}
   */
  onAddColumn(code) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      html: code,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx('tile table', {
          selected: this.props.selected,
        })}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node,
            { disableEnter: true },
          )
        }
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.data.table && (
          <Table {...omit(this.props.data.table, ['rows'])}>
            {map(this.props.data.table.rows, row => (
              <Table.Body as={row.type === 'header' ? 'thead' : 'tbody'}>
                <Table.Row>
                  {map(row.cells, cell => (
                    <Table.Cell as={cell.type === 'header' ? 'th' : 'td'}>
                      {cell.value || '\u00A0'}
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        )}
      </div>
    );
  }
}
