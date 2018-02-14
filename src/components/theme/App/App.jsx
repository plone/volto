/**
 * App container.
 * @module components/theme/App/App
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { Segment, Container } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import {
  Breadcrumbs,
  Footer,
  Header,
  Messages,
  Navigation,
  Toolbar,
} from '../../../components';
import { getBaseUrl, getView } from '../../../helpers';
import {
  getBreadcrumbs,
  getContent,
  getNavigation,
  getTypes,
  getWorkflow,
  purgeMessages,
} from '../../../actions';

@connect(
  (state, props) => ({ pathname: props.location.pathname }),
  dispatch => bindActionCreators({ purgeMessages }, dispatch),
)
/**
 * @export
 * @class AppComponent
 * @extends {Component}
 */
export class AppComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    main: PropTypes.element.isRequired,
    toolbar: PropTypes.element,
    pathname: PropTypes.string.isRequired,
    purgeMessages: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    toolbar: null,
  };

  /**
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    // We purge messages on each route change
    if (nextProps.pathname !== this.props.pathname) {
      this.props.purgeMessages();
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const path = getBaseUrl(this.props.pathname);
    const action = getView(this.props.pathname);

    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: `view-${action}view`,
          }}
        />
        <Toolbar pathname={path} selected={action} inner={this.props.toolbar} />
        <div className="pusher">
          <Header pathname={path} />
          <Navigation pathname={path} />
          <Breadcrumbs pathname={path} />
          <Segment basic className="content-area">
            <Container as="main">
              <Messages />
              {this.props.main}
            </Container>
          </Segment>
          <Footer />
        </div>
      </div>
    );
  }
}

export default asyncConnect([
  {
    key: 'breadcrumbs',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getBreadcrumbs(getBaseUrl(location.pathname))),
  },
  {
    key: 'content',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getContent(getBaseUrl(location.pathname))),
  },
  {
    key: 'navigation',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getNavigation(getBaseUrl(location.pathname))),
  },
  {
    key: 'types',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getTypes(getBaseUrl(location.pathname))),
  },
  {
    key: 'workflow',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getWorkflow(getBaseUrl(location.pathname))),
  },
])(AppComponent);
