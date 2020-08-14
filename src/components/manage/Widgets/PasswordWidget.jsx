/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Input } from 'semantic-ui-react';

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
  isDraggable,
  isDisabled,
  error,
  value,
  onChange,
  onEdit,
  onDelete,
  fieldSet,
  wrapped,
  intl,
}) => {
  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      fieldSet={fieldSet}
      wrapped={wrapped}
      draggable={isDraggable}
      onEdit={onEdit ? () => onEdit(id) : null}
      onDelete={onDelete}
      intl={intl}
      isDisabled={isDisabled}
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
  wrapped: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isDraggable: PropTypes.bool,
  isDisabled: PropTypes.bool,
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
  onChange: null,
  onEdit: null,
  onDelete: null,
  focus: false,
  isDraggable: false,
  isDisabled: false,
  icon: null,
  iconAction: null,
};

export default injectIntl(PasswordWidget);
