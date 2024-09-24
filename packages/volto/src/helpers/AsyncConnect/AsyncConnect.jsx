/* eslint-disable react/forbid-prop-types,react/no-unused-prop-types,react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ReactReduxContext } from 'react-redux';
import { loadAsyncConnect } from './ssr';
import { getMutableState } from './utils';

export class AsyncConnect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousLocation: this.isLoaded() ? null : props.location,
    };

    this.mounted = false;
    this.loadDataCounter = 0;
  }

  componentDidMount() {
    this.mounted = true;
    const dataLoaded = this.isLoaded();

    // we dont need it if we already made it on server-side
    if (!dataLoaded) {
      this.loadAsyncData(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-line camelcase
    const { location, reloadOnPropsChange } = this.props;
    const navigated = location !== nextProps.location;

    // Allow a user supplied function to determine if an async reload is necessary
    if (navigated && reloadOnPropsChange(this.props, nextProps)) {
      this.loadAsyncData(nextProps);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  isLoaded() {
    const { reduxConnectStore } = this.props;
    return getMutableState(reduxConnectStore.getState()).reduxAsyncConnect
      .loaded;
  }

  loadAsyncData({ reduxConnectStore, ...otherProps }) {
    const { location, beginGlobalLoad, endGlobalLoad } = this.props;
    const loadResult = loadAsyncConnect({
      ...otherProps,
      store: reduxConnectStore,
    });

    this.setState({ previousLocation: location });

    // TODO: think of a better solution to a problem?
    this.loadDataCounter += 1;
    beginGlobalLoad();
    return ((loadDataCounterOriginal) =>
      loadResult.then(() => {
        // We need to change propsToShow only if loadAsyncData that called this promise
        // is the last invocation of loadAsyncData method. Otherwise we can face a situation
        // when user is changing route several times and we finally show him route that has
        // loaded props last time and not the last called route
        if (
          this.loadDataCounter === loadDataCounterOriginal &&
          this.mounted !== false
        ) {
          this.setState({ previousLocation: null });
        }

        // TODO: investigate race conditions
        // do we need to call this if it's not last invocation?
        endGlobalLoad();
      }))(this.loadDataCounter);
  }

  render() {
    const { previousLocation } = this.state;
    const { location, render } = this.props;

    return (
      <Route
        location={previousLocation || location}
        render={() => render(this.props)}
      />
    );
  }
}

AsyncConnect.propTypes = {
  render: PropTypes.func,
  beginGlobalLoad: PropTypes.func.isRequired,
  endGlobalLoad: PropTypes.func.isRequired,
  reloadOnPropsChange: PropTypes.func,
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  helpers: PropTypes.any,
  reduxConnectStore: PropTypes.object.isRequired,
};

AsyncConnect.defaultProps = {
  helpers: {},
  reloadOnPropsChange() {
    return true;
  },
  render({ routes }) {
    return renderRoutes(routes);
  },
};

export const AsyncConnectWithContext = ({ context, ...otherProps }) => {
  const Context = context || ReactReduxContext;

  if (Context == null) {
    throw new Error('Please upgrade to react-redux v6');
  }

  return (
    <Context.Consumer>
      {({ store: reduxConnectStore }) => (
        <AsyncConnect reduxConnectStore={reduxConnectStore} {...otherProps} />
      )}
    </Context.Consumer>
  );
};

AsyncConnectWithContext.propTypes = {
  context: PropTypes.object,
};
