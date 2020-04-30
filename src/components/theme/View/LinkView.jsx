/**
 * Link View.
 * @module components/theme/View/LinkView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isInternalURL } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

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
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    if (!this.props.token) {
      if (isInternalURL(this.props.content.remoteUrl)) {
        this.props.history.replace(this.props.content.remoteUrl);
      } else if (!__SERVER__) {
        window.location.href = this.props.content.remoteUrl;
      }
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.token) {
      if (isInternalURL(this.props.content.remoteUrl)) {
        this.props.history.replace(this.props.content.remoteUrl);
      } else if (!__SERVER__) {
        window.location.href = this.props.content.remoteUrl;
      }
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-document">
        <h1 className="documentFirstHeading">{this.props.content.title}</h1>
        {this.props.content.description && (
          <p className="documentDescription">
            {this.props.content.description}
          </p>
        )}
        {this.props.content.remoteUrl && (
          <span>
            The link address is:
            {isInternalURL(this.props.content.remoteUrl) ? (
              <Link to={this.props.content.remoteUrl}>
                {this.props.content.remoteUrl}
              </Link>
            ) : (
              <a
                href={this.props.content.remoteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.content.remoteUrl}
              </a>
            )}
          </span>
        )}
      </Container>
    );
  }
}

export default LinkView;
