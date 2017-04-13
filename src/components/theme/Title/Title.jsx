/**
 * Title component.
 * @module components/theme/Title/Title
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Title component class.
 * @function Field
 * @param {Object} props Component properties.
 * @param {string} props.title Title.
 * @returns {string} Markup of the component.
 */
const Title = ({ title }) => <h1 className="documentFirstHeading">{title}</h1>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
