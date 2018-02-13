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
import { FormattedMessage } from 'react-intl';

import { getTypes } from '../../../actions';

@connect(
  state => ({
    types: state.types.types,
  }),
  dispatch => bindActionCreators({ getTypes }, dispatch),
)
/**
 * Component to display the adding objects view.
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
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Action to get the types
     */
    getTypes: PropTypes.func.isRequired,
    /**
     * List of the types
     */
    types: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the type
         */
        '@id': PropTypes.string,
        /**
         * True if type is addable
         */
        addable: PropTypes.bool,
        /**
         * Title of the type
         */
        title: PropTypes.string,
      }),
    ).isRequired,
    /**
     * True if menu is active
     */
    active: PropTypes.bool,
    /**
     * True if menu is expanded
     */
    expanded: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    active: false,
    expanded: true,
  };

  /**
   * Component will mount
   * @method componentWillMount
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
    return this.props.types.length > 0 ? (
      <Dropdown
        item
        trigger={
          <span>
            <Icon name="add" />{' '}
            {this.props.expanded && (
              <FormattedMessage id="Add new…" defaultMessage="Add new…" />
            )}
          </span>
        }
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
    ) : (
      <span />
    );
  }
}
