import { isEqual, isObject, transform } from 'lodash';
import React from 'react';

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

const colors = [
  'red',
  'orange',
  'olive',
  'green',
  'teal',
  'pink',
  'blue',
  'violet',
  'purple',
];
const userColors = {};
/**
 * Will generate initials from string
 * @param {string} name
 * @returns {string} only one letter if received only one name
 */
export const getInitialsFromName = (name) =>
  name
    .split(' ')
    .map((n) => n[0].toUpperCase())
    .join('');

/**
 * Will generate a random color hex
 * Will also remmember the color for each userId
 * @param {string} userId
 */
export const getUserColor = (userId) => {
  const userColor = userColors[userId]
    ? userColors[userId]
    : colors.length > 0
    ? colors.pop()
    : `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  if (!userColors[userId]) {
    userColors[userId] = userColor;
  }

  return userColor;
};
