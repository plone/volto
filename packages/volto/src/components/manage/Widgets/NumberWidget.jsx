/**
 * NumberWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { FormFieldWrapper } from '@plone/volto/components';
import { injectIntl } from 'react-intl';

/**
 * NumberWidget component class.
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Number",
 *  type: 'number',
 * }
 * ```
 */
const NumberWidget = (props) => {
  const {
    id,
    value,
    onChange,
    onBlur,
    onClick,
    isDisabled,
    maximum,
    minimum,
    placeholder,
    step,
  } = props;

  return (
    <FormFieldWrapper {...props}>
      <Input
        id={`field-${id}`}
        name={id}
        type="number"
        disabled={isDisabled}
        min={minimum || null}
        max={maximum || null}
        step={step}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
      />
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
NumberWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  step: PropTypes.number,
  placeholder: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
NumberWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
};

export default injectIntl(NumberWidget);
