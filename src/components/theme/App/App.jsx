/**
 * App container.
 * @module components/theme/App/App
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import Raven from 'raven-js';
import { Switch, Route } from 'react-router-dom';
import Error from '../../../error';

import { Breadcrumbs, Footer, Header, Messages } from '../../../components';
import { BodyClass, getBaseUrl, getView } from '../../../helpers';
import {
  getBreadcrumbs,
  getContent,
  getNavigation,
  getTypes,
  getWorkflow,
  purgeMessages,
} from '../../../actions';
import {
  Add,
  ChangePassword,
  Contents,
  Controlpanel,
  Controlpanels,
  Edit,
  Diff,
  Delete,
  History,
  View,
  NotFound,
  Layout,
  Login,
  Logout,
  ModerateComments,
  PasswordReset,
  PersonalInformation,
  PersonalPreferences,
  Register,
  RequestPasswordReset,
  Search,
  Sharing,
  UsersControlpanel,
} from '../../components';

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
    children: PropTypes.element.isRequired,
    pathname: PropTypes.string.isRequired,
    purgeMessages: PropTypes.func.isRequired,
  };

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  /**
   * ComponentDidMount
   * @method ComponentDidMount
   * @param {string} error  The error
   * @param {string} info The info
   * @returns {undefined}
   */
  componentDidMount() {
    if (__CLIENT__ && process.env.SENTRY_DSN) {
      Raven.config(process.env.SENTRY_DSN).install();
    }
  }

  /**
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.purgeMessages();

      if (this.state.hasError) {
        this.setState({ hasError: false });
      }
    }
  }

  /**
   * ComponentDidCatch
   * @method ComponentDidCatch
   * @param {string} error  The error
   * @param {string} info The info
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, errorInfo: info });
    if (__CLIENT__ && process.env.SENTRY_DSN) {
      Raven.captureException(error, { extra: info });
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
      <Fragment>
        <BodyClass className={`view-${action}view`} />
        <Header pathname={path} />
        <Breadcrumbs pathname={path} />
        <Segment basic className="content-area">
          <main>
            <Messages />
            {this.state.hasError ? (
              <Error
                message={this.state.error.message}
                stackTrace={this.state.errorInfo.componentStack}
              />
            ) : (
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/search" component={Search} />
                <Route path="/change-password" component={ChangePassword} />
                <Route path="/controlpanel" component={Controlpanels} />
                <Route
                path="/controlpanel/moderate-comments"
                component={ModerateComments}
                />
                <Route path="/controlpanel/users" component={UsersControlpanel} />
                <Route path="/controlpanel/:id" component={Controlpanel} />
                <Route path="/personal-information" component={PersonalInformation} />
                <Route path="/personal-preferences" component={PersonalPreferences} />
                <Route path="/add" component={Add} />
                <Route path="/contents" component={Contents} />
                <Route path="/sharing" component={Sharing} />
                <Route path="/**/add" component={Add} />
                <Route path="/**/contents" component={Contents} />
                <Route path="/**/delete" component={Delete} />
                <Route path="/**/diff" component={Diff} />
                <Route path="/**/edit" component={Edit} />
                <Route path="/**/history" component={History} />
                <Route path="/**/layout" component={Layout} />
                <Route path="/**/sharing" component={Sharing} />
                <Route path="/register" component={Register} />
                <Route path="/password-reset/:token" component={PasswordReset} />
                <Route path="/password-reset" component={RequestPasswordReset} />
                <Route path="/**" component={View} />
                <Route path="*" component={NotFound} status={404} />
                <Route exact path="/" component={View} />
              </Switch>
            )}
          </main>
        </Segment>
        <Footer />
      </Fragment>
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
