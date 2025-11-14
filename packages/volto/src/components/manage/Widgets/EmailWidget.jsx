/**
 * EmailWidget component.
 * @module components/manage/Widgets/EmailWidget
 */

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'semantic-ui-react';

/** EmailWidget, a widget for email addresses
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Email",
 *  widget: 'email',
 * }
 * ```
 */
const EmailWidget = (props) => {
  const {
    id,
    value = null,
    onChange = () => {},
    onBlur = () => {},
    onClick = () => {},
    minLength = null,
    maxLength = null,
    placeholder,
    isDisabled,
    description = null,
    required = false,
    error = [],
    ...rest
  } = props;
  const inputId = `field-${id}`;

  const wrapperProps = {
    ...rest,
    id,
    value,
    onChange,
    onBlur,
    onClick,
    minLength,
    maxLength,
    placeholder,
    isDisabled,
    description,
    required,
    error,
  };

  return (
    <FormFieldWrapper {...wrapperProps} className="email">
      <Input
        id={inputId}
        name={id}
        type="email"
        value={value || ''}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        minLength={minLength || null}
        maxLength={maxLength || null}
      />
    </FormFieldWrapper>
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
EmailWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};

export default EmailWidget;
