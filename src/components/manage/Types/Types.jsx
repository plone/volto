/**
 * Types component.
 * @module components/manage/Types/Types
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { filter, map } from 'lodash';
import { Dropdown, Icon } from 'semantic-ui-react';

import { getTypes } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

@connect(
  state => ({
    types: filter(state.types.types, 'addable'),
    type: state.content.data['@type'],
  }),
  dispatch => bindActionCreators({ getTypes }, dispatch),
)
/**
 * Types container class.
 * @class Types
 * @extends Component
 */
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
    ).isRequired,
    type: PropTypes.string,
    active: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    active: false,
    type: '',
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getTypes(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getTypes(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.types.length > 0 ? (
      <Dropdown
        id="toolbar-add"
        item
        trigger={<Icon size="big" name="add" />}
        className={this.props.active ? 'active' : ''}
      >
        <Dropdown.Menu>
          {map(filter(this.props.types), item => (
            <Link
              to={`${this.props.pathname}/add?type=${
                item['@id'].split('@types/')[1]
              }`.replace(/\/\//g, '/')}
              id={`toolbar-add-${item['@id']
                .split('@types/')[1]
                .toLowerCase()
                .replace(' ', '-')}`}
              className="item"
              key={item.title}
            >
              {item.title}
            </Link>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <span />
    );
  }
}
