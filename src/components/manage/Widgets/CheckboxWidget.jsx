/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Checkbox } from 'semantic-ui-react';

/**
 * CheckboxWidget component class.
 * @function CheckboxWidget
 * @returns {string} Markup of the component.
 */
const CheckboxWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  onEdit,
  onDelete,
  intl,
  fieldSet,
  wrapped,
  isDraggable,
  isDissabled,
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
      columns={1}
      draggable={isDraggable}
      onEdit={onEdit ? () => onEdit(id) : null}
      onDelete={onDelete}
      intl={intl}
      isDissabled={isDissabled}
    >
      <div className="wrapper">
        {onEdit && (
          <i aria-hidden="true" className="grey bars icon drag handle" />
        )}
        <Checkbox
          name={`field-${id}`}
          checked={value}
          disabled={isDissabled}
          onChange={(event, { checked }) => onChange(id, checked)}
          label={<label htmlFor={`field-${id}`}>{title}</label>}
        />
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  intl: PropTypes.object,
  fieldSet: PropTypes.string,
  isDraggable: PropTypes.bool,
  isDissabled: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
CheckboxWidget.defaultProps = {
  id: '',
  title: '',
  description: null,
  required: false,
  onChange: null,
  onEdit: null,
  onDelete: null,
  error: [],
  value: null,
  wrapped: false,
  intl: { formatMessage: () => {} },
  fieldSet: null,
  isDraggable: false,
  isDissabled: false,
};

export default injectIntl(CheckboxWidget);
