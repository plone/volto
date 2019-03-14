/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Icon, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { getBreadcrumbs } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
});

@injectIntl
@connect(
  state => ({
    items: state.breadcrumbs.items,
  }),
  dispatch => bindActionCreators({ getBreadcrumbs }, dispatch),
)
/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
export default class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment className="breadcrumbs" secondary vertical>
        <Container>
          <Breadcrumb>
            <Link
              to="/"
              className="section"
              title={this.props.intl.formatMessage(messages.home)}
            >
              <Icon name="home" />
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
