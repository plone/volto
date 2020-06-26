/**
 * TextareaWidget component.
 * @module components/manage/Widgets/TextareaWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import { default as React, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Label, TextArea } from 'semantic-ui-react';

/**
 * TextareaWidget component class.
 * @function TextareaWidget
 * @returns {string} Markup of the component.
 */
const TextareaWidget = ({
  id,
  title,
  required,
  description,
  error,
  maxLength,
  value,
  onChange,
  onEdit,
  onDelete,
  intl,
  isDissabled,
  isDraggable,
  fieldSet,
  wrapped,
}) => {
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
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      fieldSet={fieldSet}
      wrapped={wrapped}
      onEdit={onEdit ? () => onEdit(id) : null}
      onDelete={onDelete}
      intl={intl}
      draggable={isDraggable}
      isDissabled={isDissabled}
      className="textarea"
    >
      <TextArea
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={isDissabled}
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
  isDissabled: PropTypes.bool,
  isDraggable: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextareaWidget.defaultProps = {
  id: null,
  title: null,
  description: null,
  maxLength: null,
  required: false,
  isDissabled: false,
  isDraggable: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(TextareaWidget);
