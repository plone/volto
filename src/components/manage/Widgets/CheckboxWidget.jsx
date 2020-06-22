/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Checkbox } from 'semantic-ui-react';

import { defineMessages, injectIntl } from 'react-intl';
import { FormFieldWrapper } from '@plone/volto/components';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
});

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
}) => {
  const schema = {
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: ['title', 'id', 'description', 'required'],
      },
    ],
    properties: {
      id: {
        type: 'string',
        title: intl.formatMessage(messages.idTitle),
        description: intl.formatMessage(messages.idDescription),
      },
      title: {
        type: 'string',
        title: intl.formatMessage(messages.title),
      },
      description: {
        type: 'string',
        widget: 'textarea',
        title: intl.formatMessage(messages.description),
      },
      required: {
        type: 'boolean',
        title: intl.formatMessage(messages.required),
      },
    },
    required: ['id', 'title'],
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
      columns={1}
    >
      <div className="wrapper">
        {onEdit && (
          <div className="toolbar">
            <button
              aria-label={this.props.intl.formatMessage(messages.edit)}
              className="item ui noborder button"
              onClick={() => onEdit(id, schema)}
            >
              <Icon name="write square" size="large" color="blue" />
            </button>
            <button
              aria-label={this.props.intl.formatMessage(messages.delete)}
              className="item ui noborder button"
              onClick={() => onDelete(id)}
            >
              <Icon name="close" size="large" color="red" />
            </button>
          </div>
        )}
        {onEdit && (
          <i aria-hidden="true" className="grey bars icon drag handle" />
        )}
        <Checkbox
          name={`field-${id}`}
          checked={value}
          disabled={onEdit !== null}
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
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
CheckboxWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(CheckboxWidget);
