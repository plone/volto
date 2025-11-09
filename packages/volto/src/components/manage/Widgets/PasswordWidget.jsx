/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { injectIntl } from 'react-intl';

/**
 * PasswordWidget component class.
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Password",
 *  type: 'password',
 * }
 * ```
 */
const PasswordWidget = (props) => {
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
  } = props;

  return (
    <FormFieldWrapper
      {...props}
      description={description}
      required={required}
      error={error}
      value={value}
    >
      <Input
        id={`field-${id}`}
        name={id}
        type="password"
        disabled={isDisabled}
        value={value || ''}
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
        autoComplete="off"
      />
    </FormFieldWrapper>
  );
};
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
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default injectIntl(PasswordWidget);
