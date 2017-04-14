/**
 * Types component.
 * @module components/manage/Types/Types
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { filter, map } from 'lodash';
import { Dropdown, Icon } from 'semantic-ui-react';

import { getTypes } from '../../../actions';

/**
 * Types container class.
 * @class Types
 * @extends Component
 */
@connect(
  state => ({
    types: state.types.types,
  }),
  dispatch => bindActionCreators({ getTypes }, dispatch),
)
export default class Types extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    getTypes: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        addable: PropTypes.bool,
        title: PropTypes.string,
      }),
    ),
    active: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    types: [],
    active: false,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getTypes(this.props.pathname);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.types.length > 0
      ? <Dropdown
          item
          trigger={<span><Icon name="add" /> Add new...</span>}
          pointing="left"
          className={this.props.active ? 'active' : ''}
        >
          <Dropdown.Menu>
            {map(filter(this.props.types), item => (
              <Link
                to={`${this.props.pathname}/add?type=${item.title}`}
                className="item"
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      : <span />;
  }
}
