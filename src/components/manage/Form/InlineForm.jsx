import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import React from 'react';
import { keys, map } from 'lodash';
import { Field } from '@plone/volto/components';
import { Segment, Message } from 'semantic-ui-react';

const messages = defineMessages({
  editValues: {
    id: 'Edit values',
    defaultMessage: 'Edit values',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors',
    defaultMessage: 'There were some errors',
  },
});

const InlineForm = ({
  block,
  description,
  error, // Such as {message: "It's not good"}
  errors = {},
  formData,
  onChangeField,
  schema,
  title,
  intl,
}) => {
  const _ = intl.formatMessage;
  const defaultFieldset = schema.fieldsets.find((o) => o.id === 'default');
  const other = schema.fieldsets.filter((o) => o.id !== 'default');
  return (
    <Segment.Group raised className="form">
      <header className="header pulled">
        <h2>{title || _(messages.editValues)}</h2>
      </header>
      {description && (
        <Segment secondary className="attached">
          {description}
        </Segment>
      )}
      {keys(errors).length > 0 && (
        <Message
          icon="warning"
          negative
          attached
          header={_(messages.error)}
          content={_(messages.thereWereSomeErrors)}
        />
      )}
      {error && (
        <Message
          icon="warning"
          negative
          attached
          header={_(messages.error)}
          content={error.message}
        />
      )}

      <div id={`blockform-fieldset-${defaultFieldset.id}`}>
        <Segment className="attached">
          {map(defaultFieldset.fields, (field, index) => (
            <Field
              {...schema.properties[field]}
              id={field}
              fieldSet={defaultFieldset.title.toLowerCase()}
              focus={index === 0}
              value={formData[field]}
              required={schema.required.indexOf(field) !== -1}
              onChange={(id, value) => {
                onChangeField(id, value);
              }}
              key={field}
              error={errors[field]}
              block={block}
            />
          ))}
        </Segment>
      </div>

      {other.map((fieldset) => (
        <div key={fieldset.id} id={`blockform-fieldset-${fieldset.id}`}>
          {title && (
            <Segment className="secondary attached">{fieldset.title}</Segment>
          )}
          <Segment className="attached">
            {map(fieldset.fields, (field) => (
              <Field
                {...schema.properties[field]}
                id={field}
                value={formData[field]}
                required={schema.required.indexOf(field) !== -1}
                onChange={(id, value) => {
                  onChangeField(id, value);
                }}
                key={field}
                error={errors[field]}
                block={block}
              />
            ))}
          </Segment>
        </div>
      ))}
    </Segment.Group>
  );
};

InlineForm.defaultProps = {
  block: null,
  description: null,
  formData: null,
  onChangeField: null,
  error: null,
  errors: {},
  schema: {},
};

InlineForm.propTypes = {
  block: PropTypes.string,
  description: PropTypes.string,
  schema: PropTypes.shape({
    fieldsets: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
    properties: PropTypes.objectOf(PropTypes.any),
    definitions: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.arrayOf(PropTypes.string),
  }),
  formData: PropTypes.objectOf(PropTypes.any),
  pathname: PropTypes.string,
  onChangeField: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default injectIntl(InlineForm, { forwardRef: true });
