/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { FormFieldWrapper } from '@plone/volto/components';

/**
 * PasswordWidget component class.
 * @function PasswordWidget
 * @returns {string} Markup of the component.
 */
const PasswordWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
  wrapped,
}) => (
  <FormFieldWrapper
    id={id}
    title={title}
    description={description}
    required={required}
    error={error}
    fieldSet={fieldSet}
    wrapped={wrapped}
  >
    <Input
      id={`field-${id}`}
      name={id}
      type="password"
      value={value || ''}
      onChange={({ target }) =>
        onChange(id, target.value === '' ? undefined : target.value)
      }
    />
  </FormFieldWrapper>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
PasswordWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
PasswordWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default PasswordWidget;
