/**
 * Contents toolbar component.
 * @module components/manage/Contents/ContentsToolbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

@injectIntl
@connect((state, props) => ({
  pathname: props.location.pathname,
}))
/**
 * ContentsToolbar container class.
 * @class ContentsToolbar
 * @extends Component
 */
export default class ContentsToolbar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div>
        <Link
          to={getBaseUrl(this.props.pathname)}
          id="toolbar-cancel"
          className="item"
        >
          <Icon
            name="remove"
            size="big"
            color="red"
            title={this.props.intl.formatMessage(messages.cancel)}
          />
        </Link>
      </div>
    );
  }
}
