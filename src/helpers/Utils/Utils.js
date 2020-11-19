import React from 'react';
import { transform, isEqual, isObject } from 'lodash';

import loadable from '@loadable/component';

const LoadableToast = loadable.lib(() => import('react-toastify'));

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? difference(value, base[key])
          : value;
    }
  });
}

/**
 * Throw an error if the wrapped function returns undefined
 *
 * @param {Function} func
 */
export const safeWrapper = (func) => (config) => {
  const res = func(config);
  if (typeof res === 'undefined') {
    throw new Error(`Configuration function doesn't return config, ${func}`);
  }
  return res;
};

/**
 * A helper to pipe a configuration object through configuration loaders
 *
 * @param {Array} configMethods A list of configuration methods
 * @param {Object} config The Volto singleton config object
 */
export function applyConfig(configMethods, config) {
  return configMethods.reduce((acc, apply) => safeWrapper(apply)(acc), config);
}

/**
 * A HOC factory that propagates the status of asyncConnected requests back to
 * the main server process, to allow properly expressing an error status as
 * HTTP status code
 *
 * @param {} code HTTP return code
 */
export function withServerErrorCode(code) {
  return (WrappedComponent) => (props) => {
    if (props.staticContext && Object.keys(props.staticContext).length === 0) {
      const { staticContext } = props;
      staticContext.error_code = code;
      staticContext.error = props.error;
    }
    return <WrappedComponent {...props} />;
  };
}

/**
 * withToastify. A HOC that lazy-loads react-toastify and injects it as
 * the `toastify` property to the wrapped component
 *
 * @param {} WrappedComponent
 * @return Component
 */
export function withToastify(WrappedComponent) {
  class WithLoadableToastify extends React.Component {
    toastify = React.createRef();

    render() {
      return (
        <>
          <LoadableToast ref={this.toastify} />
          <WrappedComponent
            {...this.props}
            toastify={
              this.toastify.current ? this.toastify.current.toast : null
            }
          />
        </>
      );
    }
  }

  WithLoadableToastify.displayName = `WithLoadableToastify(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithLoadableToastify;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
