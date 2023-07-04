/**
 * Link View.
 * @module components/theme/View/LinkView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import config from '@plone/volto/registry';

/**
 * View container class.
 * @class View
 * @extends Component
 */
class LinkView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      remoteUrl: PropTypes.string,
    }),
    token: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { remoteUrl } = this.props.content;
    return !this.props.token ? (
      <Redirect to={remoteUrl} />
    ) : (
    const { openExternalLinkInNewTab } = config.settings;
    return (
      <Container id="page-document">
        <h1 className="documentFirstHeading">{this.props.content.title}</h1>
        {this.props.content.description && (
          <p className="documentDescription">
            {this.props.content.description}
          </p>
        )}
        {remoteUrl && (
          <p>
            <FormattedMessage
              id="The link address is:"
              defaultMessage="The link address is:"
            />{' '}
            <UniversalLink
              href={remoteUrl}
              openLinkInNewTab={
                openExternalLinkInNewTab && !isInternalURL(remoteUrl)
              }
            >
              {flattenToAppURL(remoteUrl)}
            </UniversalLink>
          </p>
        )}
      </Container>
    );
  }
}

export default LinkView;
