/**
 * Login container.
 * @module components/theme/Sitemap/Sitemap
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions';

const messages = defineMessages({
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
});
/**
 * Sitemap class.
 * @class Sitemap
 * @extends Component
 */
class Sitemap extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { settings } = config;
    if (settings.isMultilingual) {
      this.props.getNavigation(`${this.props.lang}`, 4);
    } else {
      this.props.getNavigation('', 4);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

  renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li
            key={item.url}
            className={item.items?.length > 0 ? 'with-children' : ''}
          >
            <Link to={item.url}>{item.title}</Link>
            {item.items && this.renderItems(item.items)}
          </li>
        ))}
      </ul>
    );
  };
  render() {
    const { items } = this.props;
    return (
      <div id="page-sitemap">
        <Helmet title={this.props.intl.formatMessage(messages.Sitemap)} />
        <Container className="view-wrapper">
          <h1>{this.props.intl.formatMessage(messages.Sitemap)} </h1>
          {items && this.renderItems(items)}
        </Container>
      </div>
    );
  }
}

export const __test__ = compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Sitemap);

export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
  asyncConnect([
    {
      key: 'navigation',
      promise: ({ location, store: { dispatch, getState } }) => {
        const { settings } = config;
        const lang = getState().intl.locale;
        if (settings.isMultilingual) {
          return __SERVER__ && dispatch(getNavigation(`${lang}`, 4));
        } else {
          return __SERVER__ && dispatch(getNavigation('', 4));
        }
      },
    },
  ]),
)(Sitemap);
