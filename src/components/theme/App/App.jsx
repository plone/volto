/**
 * App container.
 * @module components/theme/App/App
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { compose } from 'redux';

import { Breadcrumbs, Footer, Header, Navigation, Toolbar } from '../../../components';
import { getBaseUrl, getView } from '../../../helpers';
import { getContent, getNavigation, getBreadcrumbs, getWorkflow } from '../../../actions';

/**
 * This function defines the app component.
 * @function App
 * @params {Object} props Properties.
 * @params {string} props.pathname Current pathname.
 * @params {object} props.children Child objects.
 * @returns {string} Markup of the component.
 */
const App = ({ pathname, children }) => {
  const path = getBaseUrl(pathname);
  const action = getView(pathname);

  return (
    <div className="plone-toolbar-expanded">
      <Toolbar path={path} selected={action} />
      <div className="outer-wrapper">
        <Header />
        <Navigation path={path} />
        <div id="above-content-wrapper">
          <section id="viewlet-above-content">
            <Breadcrumbs />
          </section>
        </div>
        <div className="container">
          <div className="row">
            <aside id="global_statusmessage" />
          </div>
          <main id="main-container" className="row row-offcanvas row-offcanvas-right">
            <div id="column1-container" />
            <div id="content-container">
              {children}
            </div>
            <div id="column2-container" />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
App.propTypes = {
  children: PropTypes.element.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default compose(
  asyncConnect(
    [
      {
        key: 'content',
        promise: ({ store: { dispatch, getState } }) =>
          dispatch(getContent(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
      },
      {
        key: 'navigation',
        promise: ({ store: { dispatch, getState } }) =>
          dispatch(
            getNavigation(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
      },
      {
        key: 'breadcrumbs',
        promise: ({ store: { dispatch, getState } }) =>
          dispatch(
            getBreadcrumbs(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
      },
      {
        key: 'workflow',
        promise: ({ store: { dispatch, getState } }) =>
          dispatch(
            getWorkflow(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
      },
    ],
  ),
  connect(
    state => ({ pathname: state.routing.locationBeforeTransitions.pathname }),
  ),
)(App);
