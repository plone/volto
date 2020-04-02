/**
 * Login container.
 * @module components/theme/Sitemap/Sitemap
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
//import { searchContent } from '@plone/volto/actions';
import { Link } from 'react-router-dom';

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
    //searchContent: PropTypes.func.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    //this.fetchContents();
    this.props.getNavigation('/', 4);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (this.props.searchRequest.loading && nextProps.searchRequest.loaded) {
    //   this.setState({
    //     items: nextProps.items,
    //   });
    // }
  }

  /**
   * Fetch contents handler
   * @method fetchContents
   * @param {string} pathname Pathname to fetch contents.
   * @returns {undefined}
   */

  // fetchContents() {
  //   this.props.searchContent('/', {
  //     //'path.depth': 50,
  //     //   sort_on: this.state.sort_on,
  //     // sort_order: this.state.sort_order,
  //     metadata_fields: 'modified',
  //     b_size: 100000000,
  //   });
  // }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

  renderItems = items => {
    return (
      <ul>
        {items.map(item => (
          <li key={item['@id']}>
            <Link to={item['@id']}>{item.title}</Link>
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

export default compose(
  injectIntl,
  connect(
    state => ({
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Sitemap);
