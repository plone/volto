import { cloneDeepWith, flatten, isEqual, isObject, transform } from 'lodash';
import React from 'react';
import { matchPath } from 'react-router';
import config from '@plone/volto/registry';

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
 * @returns {Object|string} Moment object or string if format is set
 */
export const parseDateTime = (locale, value, format, moment) => {
  //  Used to set a server timezone or UTC as default
  moment.updateLocale(locale, moment.localeData(locale)._config); // copy locale to moment-timezone
  let datetime = null;

  if (value) {
    // check if datetime has timezone, otherwise assumes it's UTC
    datetime =
      !value.match(/T/) || value.match(/T(.)*(-|\+|Z)/g)
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

/**
 * Converts a language code like pt-br to the format `pt_BR` (`lang_region`)
 * Useful for passing from Plone's i18n lang names to Xnix locale names
 * eg. LC_MESSAGES/lang_region.po filenames. Also used in the I18N_LANGUAGE cookie.
 * @param {string} language Language to be converted
 * @returns {string} Language converted
 */
export const toGettextLang = (language) => {
  if (language.includes('-')) {
    let normalizedLang = language.split('-');
    normalizedLang = `${normalizedLang[0]}_${normalizedLang[1].toUpperCase()}`;
    return normalizedLang;
  }

  return language;
};
export const normalizeLanguageName = toGettextLang;

/**
 * Converts a language code like pt-br or pt_BR to the format `pt-BR`.
 * `react-intl` only supports this syntax. We also use it for the locales
 * in the volto Redux store.
 * @param {string} language Language to be converted
 * @returns {string} Language converted
 */
export const toReactIntlLang = (language) => {
  if (language.includes('_') || language.includes('-')) {
    let langCode = language.split(/[-_]/);
    langCode = `${langCode[0]}-${langCode[1].toUpperCase()}`;
    return langCode;
  }

  return language;
};
export const toLangUnderscoreRegion = toReactIntlLang; // old name for backwards-compat

/**
 * Converts a language code like pt_BR or pt-BR to the format `pt-br`.
 * This format is used on the backend and in volto config settings.
 * @param {string} language Language to be converted
 * @returns {string} Language converted
 */
export const toBackendLang = (language) => {
  return toReactIntlLang(language).toLowerCase();
};

/**
 * Lookup if a given expander is set in apiExpanders for the given path and action type
 * @param {string} expander The id literal of the expander eg. `navigation`
 * @param {string} path The path (no URL) to check if the expander has effect
 * @param {string} type The Redux action type
 * @returns {boolean} Return if the expander is present for the path and the type given
 */
export const hasApiExpander = (expander, path = '', type = 'GET_CONTENT') => {
  return flatten(
    config.settings.apiExpanders
      .filter((expand) => matchPath(path, expand.match) && expand[type])
      .map((expand) => expand[type]),
  ).includes(expander);
};

/**
 * Insert element into array at a give index
 * @param {Array} array Array with data
 * @param {*} element Element to be inserted
 * @param {number} index Index of item to be inserted at
 * @returns {Array} Array with inserted element
 */
export const insertInArray = (array, element, index) => [
  ...array.slice(0, index),
  element,
  ...array.slice(index),
];

/**
 * Replace element in array at a give index
 * @param {Array} array Array with data
 * @param {*} element Element to be replaced
 * @param {number} index Index of item to be replaced at
 * @returns {Array} Array with replaced element
 */
export const replaceItemOfArray = (array, index, value) =>
  Object.assign([...array], { [index]: value });

/**
 * Remove item from array at given index
 * @param {Array} array Array with data
 * @param {number} index Index of item to be removed
 * @returns {Array} Array without deleted element
 */
export const removeFromArray = (array, index) => {
  let newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
};

/**
 * Moves an item from origin to target inside an array in an immutable way
 * @param {Array} array Array with data
 * @param {number} origin Index of item to be moved from
 * @param {number} target Index of item to be moved to
 * @returns {Array} Resultant array
 */
export const reorderArray = (array, origin, target) => {
  const result = Array.from(array);
  const [removed] = result.splice(origin, 1);
  result.splice(target, 0, removed);

  return result;
};

/**
 * Normalize (unicode) string to a normalized plain ascii string
 * @method normalizeString
 * @param {string} str The string to be normalized
 * @returns {string} Normalized plain ascii string
 */
export function normalizeString(str) {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

/**
 * Slugify a string: remove whitespaces, special chars and replace with _
 * @param {string} string String to be slugified
 * @returns {string} Slugified string
 */
export const slugify = (string) => {
  return string
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/[^\w]+/g, '');
};

/**
 * cloneDeep an object with support for JSX nodes on it
 * Somehow, in a browser it fails with a "Illegal invocation" error
 * but in node (Jest test) it doesn't. This does the trick.
 * @param {object} object object to be cloned
 * @returns {object} deep cloned object
 */
export const cloneDeepSchema = (object) => {
  return cloneDeepWith(object, (value) => {
    if (React.isValidElement(value)) {
      // If a JSX valid element, just return it, do not try to deep clone it
      return value;
    }
  });
};

/**
 * Creates an array given a range of numbers
 * @param {number} start start number from
 * @param {number} stop stop number at
 * @param {number} step step every each number in the sequence
 * @returns {array} The result, eg. [0, 1, 2, 3, 4]
 */
export const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

/**
 * Given an event target element returns if it's an interactive element
 * of the one in the list.
 * @param {node} element event.target element type
 * @returns {boolean} If it's an interactive element of the list
 */
export function isInteractiveElement(
  element,
  interactiveElements = [
    'button',
    'input',
    'textarea',
    'select',
    'option',
    'svg',
    'path',
  ],
) {
  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}
