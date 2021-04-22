import { isEqual, isObject, transform } from 'lodash';
import React from 'react';
import moment from 'moment';

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

// See https://en.wikipedia.org/wiki/Web_colors#Extended_colors
const safeColors = [
  'Black',
  'Blue',
  'BlueViolet',
  'Brown',
  'Crimson',
  'DarkBlue',
  'DarkCyan',
  'DarkGreen',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrchid',
  'DarkRed',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkViolet',
  'DeepPink',
  'DimGray',
  'DodgerBlue',
  'Firebrick',
  'ForestGreen',
  'Fuchsia',
  'Green',
  'IndianRed',
  'Indigo',
  'Magenta',
  'Maroon',
  'MediumBlue',
  'MediumSlateBlue',
  'MediumVioletRed',
  'MidnightBlue',
  'Navy',
  'Olive',
  'OliveDrab',
  'OrangeRed',
  'Purple',
  'Red',
  'RoyalBlue',
  'SaddleBrown',
  'SeaGreen',
  'Sienna',
  'SlateBlue',
  'SlateGray',
  'SteelBlue',
  'Teal',
];
const namedColors = {};
/**
 * Will generate initials from string
 * @param {string} name
 * @param {integer} count
 * @returns {string} only one letter if received only one name
 */
export const getInitials = (title, limit) => {
  const text = title
    .split(' ')
    .map((n) => (n[0] ? n[0].toUpperCase() : ''))
    .join('');
  if (limit) {
    return text.substring(0, limit);
  }
  return text;
};

/**
 * Will generate a random color hex
 * Will also remmember the color for each userId
 * @param {string} userId
 */
export const getColor = (name) => {
  const namedColor = namedColors[name]
    ? namedColors[name]
    : safeColors.length > 0
    ? safeColors.pop()
    : `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  if (!namedColors[name]) {
    namedColors[name] = namedColor;
  }
  return namedColor;
};

/**
 * Fixes TimeZones issues on moment date objects
 * Parses a DateTime and sets correct moment locale
 * @param {string} locale Current locale
 * @param {string} value DateTime string
 * @param {string} format Date format of choice
 * @returns {Object|string} Moment object or sting if format is set
 */
export const parseDateTime = (locale, value, format) => {
  //  Used to set a server timezone or UTC as default
  moment.defineLocale(locale, moment.localeData(locale)._config); // copy locale to moment-timezone
  let datetime = null;

  if (value) {
    // check if datetime has timezone, otherwise assumes it's UTC
    datetime = value.match(/T(.)*(-|\+|Z)/g)
      ? // Since we assume UTC everywhere, then transform to local (momentjs default)
        moment(value)
      : // This might happen in old Plone versions dates
        moment(`${value}Z`);
  }

  if (format && datetime) {
    return datetime.format(format);
  }
  return datetime;
};
