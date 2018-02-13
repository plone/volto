/**
 * App container.
 * @module components/theme/App/App
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { compose } from 'redux';
import { Segment, Container } from 'semantic-ui-react';

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
} from '../../../actions';

/**
 * Component to display the app.
 * @function AppComponent
 * @param {Object} props Properties.
 * @param {string} props.pathname Current pathname.
 * @param {object} props.children Child objects.
 * @returns {string} Markup of the component.
 */
export const AppComponent = ({ pathname, children }) => {
  const path = getBaseUrl(pathname);
  const action = getView(pathname);

  return (
    <div>
      <Toolbar pathname={path} selected={action} />
      <div className="pusher">
        <Header pathname={path} />
        <Navigation pathname={path} />
        <Breadcrumbs pathname={path} />
        <Segment basic>
          <Container>{children}</Container>
        </Segment>
        <Footer />
      </div>
      <Messages />
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
AppComponent.propTypes = {
  /**
   * Child components
   */
  children: PropTypes.element.isRequired,
  /**
   * Pathname of the current object
   */
  pathname: PropTypes.string.isRequired,
};

export default compose(
  asyncConnect([
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
  ]),
  connect((state, props) => ({ pathname: props.location.pathname })),
)(AppComponent);
