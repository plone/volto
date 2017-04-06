/**
 * Fieldset component.
 * @module components/manage/Form/Fieldset
 */

import React, { PropTypes } from 'react';

import { Field } from '../../../components';

/**
 * Fieldset component class.
 * @function Fieldset
 * @returns {string} Markup of the component.
 */
const Fieldset = ({ id, title, active, fields }) =>
  <fieldset
    id={`fieldset-${id}`}
    className={`autotoc-section ${active ? 'active' : ''}`}
  >
    <legend id={`fieldsetlegend-${id}`}>{title}</legend>
    {fields.map(field =>
      <Field {...field} key={field.id} />,
    )}
  </fieldset>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Fieldset.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Fieldset;
