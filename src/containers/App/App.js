/**
 * App container.
 * @module containers/App
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import config from 'config';
import { Breadcrumbs, Footer, Header, Navigation } from 'components';

/**
 * This class defines the app container.
 * @function App
 * @param {Object} props Component properties.
 * @param {Object} props.children Child nodes.
 * @returns {string} Markup for the component.
 */
const App = ({ children }) => (
  <div>
    <Helmet { ...config.app.head } />
    <div className="outer-wrapper">
      <Header />
      <Navigation />
      <div id="above-content-wrapper">
        <section id="viewlet-above-content">
          <Breadcrumbs />
        </section>
      </div>
      <div className="container">
        <div className="row">
          <aside id="global_statusmessage"></aside>
        </div>
        <main id="main-container" className="row row-offcanvas row-offcanvas-right">
          <div id="column1-container">
          </div>
          <div id="content-container">
            {children}
          </div>
          <div id="column2-container">
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect(
  () => ({}),
  { pushState: routeActions.push }
)(App);
