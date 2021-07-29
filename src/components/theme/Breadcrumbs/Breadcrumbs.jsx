/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

import homeSVG from '@plone/volto/icons/home.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    root: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  componentDidMount() {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
      this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
        this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
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
      <Segment
        role="navigation"
        aria-label={this.props.intl.formatMessage(messages.breadcrumbs)}
        className="breadcrumbs"
        secondary
        vertical
      >
        <Container>
          <Breadcrumb>
            <Link
              to={this.props.root || '/'}
              className="section"
              title={this.props.intl.formatMessage(messages.home)}
            >
              <Icon name={homeSVG} size="18px" />
            </Link>
            {this.props.items.map((item, index, items) => [
              <Breadcrumb.Divider key={`divider-${item.url}`} />,
              index < items.length - 1 ? (
                <Link key={item.url} to={item.url} className="section">
                  {item.title}
                </Link>
              ) : (
                <Breadcrumb.Section key={item.url} active>
                  {item.title}
                </Breadcrumb.Section>
              ),
            ])}
          </Breadcrumb>
        </Container>
      </Segment>
    );
  }
}

export const BreadcrumbsComponent = Breadcrumbs;
export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.breadcrumbs.items,
      root: state.breadcrumbs.root,
    }),
    { getBreadcrumbs },
  ),
)(Breadcrumbs);
