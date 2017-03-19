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
      <Toolbar pathname={path} selected={action} />
      <div className="outer-wrapper">
        <Header />
        <Navigation pathname={path} />
        <div id="above-content-wrapper">
          <section id="viewlet-above-content">
            <Breadcrumbs pathname={path} />
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
        promise: ({ location, store: { dispatch } }) =>
          dispatch(getContent(getBaseUrl(location.pathname))),
      },
      {
        key: 'navigation',
        promise: ({ location, store: { dispatch } }) =>
          dispatch(
            getNavigation(getBaseUrl(location.pathname))),
      },
      {
        key: 'breadcrumbs',
        promise: ({ location, store: { dispatch } }) =>
          dispatch(
            getBreadcrumbs(getBaseUrl(location.pathname))),
      },
      {
        key: 'workflow',
        promise: ({ location, store: { dispatch } }) =>
          dispatch(
            getWorkflow(getBaseUrl(location.pathname))),
      },
    ],
  ),
  connect(
    (state, props) => ({ pathname: props.location.pathname }),
  ),
)(App);
