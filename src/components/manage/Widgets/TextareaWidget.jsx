/**
 * TextareaWidget component.
 * @module components/manage/Widgets/TextareaWidget
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, TextArea } from 'semantic-ui-react';

import { injectIntl } from 'react-intl';
import { FormFieldWrapper } from '@plone/volto/components';

/**
 * TextareaWidget component class.
 * @function TextareaWidget
 * @returns {string} Markup of the component.
 */
const TextareaWidget = (props) => {
  const { id, maxLength, value, onChange, placeholder } = props;
  const [lengthError, setlengthError] = useState('');

  const onhandleChange = (id, value) => {
    if (maxLength & value?.length) {
      let remlength = maxLength - value.length;
      if (remlength < 0) {
        setlengthError(`You have exceed word limit by ${Math.abs(remlength)}`);
      } else {
        setlengthError('');
      }
    }
    onChange(id, value);
  };

  return (
    <FormFieldWrapper {...props} className="textarea">
      <TextArea
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={props.isDisabled}
        placeholder={placeholder}
        onChange={({ target }) =>
          onhandleChange(id, target.value === '' ? undefined : target.value)
        }
      />
      {lengthError.length > 0 && (
        <Label key={lengthError} basic color="red" pointing>
          {lengthError}
        </Label>
      )}
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextareaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextareaWidget.defaultProps = {
  description: null,
  maxLength: null,
  required: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(TextareaWidget);
