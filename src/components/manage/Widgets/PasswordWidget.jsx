/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon as IconOld, Input } from 'semantic-ui-react';

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
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
});

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
  isDissabled,
  error,
  value,
  onChange,
  onEdit,
  onDelete,
  fieldSet,
  wrapped,
  intl,
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
      draggable={isDraggable}
      onEdit={onEdit}
    >
      {onEdit && !isDissabled && (
        <div className="toolbar">
          <button
            className="item ui noborder button"
            onClick={() => onEdit(id, schema)}
          >
            <IconOld name="write square" size="large" color="blue" />
          </button>
          <button
            aria-label={intl.formatMessage(messages.delete)}
            className="item ui noborder button"
            onClick={() => onDelete(id)}
          >
            <IconOld name="close" size="large" color="red" />
          </button>
        </div>
      )}
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
  isDraggable: false,
};

export default injectIntl(PasswordWidget);
