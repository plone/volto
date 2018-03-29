/**
 * TextareaWidget component.
 * @module components/manage/Widgets/TextareaWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon, Label, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

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
});

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
  value,
  onChange,
  onEdit,
  onDelete,
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
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={description ? 'help textarea' : 'textarea'}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>
                {onEdit && (
                  <i
                    aria-hidden="true"
                    className="grey bars icon drag handle"
                  />
                )}
                {title}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            {onEdit && (
              <div className="toolbar">
                <a className="item" onClick={() => onEdit(id, schema)}>
                  <Icon name="write square" size="large" color="blue" />
                </a>
                <a className="item" onClick={() => onDelete(id)}>
                  <Icon name="close" size="large" color="red" />
                </a>
              </div>
            )}
            <TextArea
              id={`field-${id}`}
              name={id}
              value={value || ''}
              disabled={onEdit !== null}
              onChange={({ target }) =>
                onChange(id, target.value === '' ? undefined : target.value)
              }
            />
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
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
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  intl: intlShape.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextareaWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(TextareaWidget);
