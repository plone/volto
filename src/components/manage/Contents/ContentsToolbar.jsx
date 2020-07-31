/**
 * Contents toolbar component.
 * @module components/manage/Contents/ContentsToolbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

/**
 * ContentsToolbar container class.
 * @class ContentsToolbar
 * @extends Component
 */
class ContentsToolbar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
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

export default compose(
  injectIntl,
  connect((state, props) => ({
    pathname: props.location.pathname,
  })),
)(ContentsToolbar);
