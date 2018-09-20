/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import config from '~/config';

@connect(state => ({
  token: state.userSession.token,
  content: state.content.data,
}))
/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
export default class Anontools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      !this.props.token && (
        <List floated="right" horizontal>
          <Link
            className="item"
            to={`/login${
              this.props.content
                ? `?return_url=${this.props.content['@id'].replace(
                    config.apiPath,
                    '',
                  )}`
                : ''
            }`}
          >
            <FormattedMessage id="Log in" defaultMessage="Log in" />
          </Link>
          <Link className="item" to="/register">
            <FormattedMessage id="Register" defaultMessage="Register" />
          </Link>
        </List>
      )
    );
  }
}
