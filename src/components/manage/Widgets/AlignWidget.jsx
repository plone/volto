/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { AlignBlock } from '@plone/volto/helpers';

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

const AlignWidget = ({
  description,
  error,
  fieldSet,
  id,
  intl,
  maxLength,
  onChange,
  onDelete,
  onEdit,
  placeholder,
  required,
  title,
  value,
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
      onEdit={onEdit}
      draggable={true}
      className="align-widget"
    >
      {onEdit && (
        <div className="toolbar">
          <button
            className="item ui noborder button"
            onClick={() => onEdit(id, schema)}
          >
            <Icon name="write square" size="large" color="blue" />
          </button>
          <button
            aria-label={intl.formatMessage(messages.delete)}
            className="item ui noborder button"
            onClick={() => onDelete(id)}
          >
            <Icon name="close" size="large" color="red" />
          </button>
        </div>
      )}
      <AlignBlock
        align={value}
        onChangeBlock={(block, { align }) => onChange(id, align)}
        data={{ align: value }}
        block={id}
      />
    </FormFieldWrapper>
  );
};

export default injectIntl(AlignWidget);
