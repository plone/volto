import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import React from 'react';
import { keys, map } from 'lodash';
import { Field, Icon, MaybeWrap } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { Accordion, Segment, Message } from 'semantic-ui-react';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const messages = defineMessages({
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
  icon,
  headerActions,
  footer,
  intl,
  fieldIndex,
  basic = false,
  unwrapped = false,
}) => {
  const _ = intl.formatMessage;
  const defaultFieldset = schema.fieldsets.find((o) => o.id === 'default');
  const other = schema.fieldsets.filter((o) => o.id !== 'default');

  const [currentActiveFieldset, setCurrentActiveFieldset] = React.useState(0);
  function handleCurrentActiveFieldset(e, blockProps) {
    const { index } = blockProps;
    const newIndex = currentActiveFieldset === index ? -1 : index;

    setCurrentActiveFieldset(newIndex);
  }

  return (
    <MaybeWrap
      as={Segment.Group}
      condition={!unwrapped}
      raised={!basic}
      className="form"
    >
      {title && (
        <header className="header pulled">
          {icon}
          <h2>{title || _(messages.editValues)}</h2>
          {headerActions}
        </header>
      )}
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

      {defaultFieldset.fields.length > 0 && (
        <div id={`blockform-fieldset-${defaultFieldset.id}`}>
          <Segment className="form attached">
            {map(defaultFieldset.fields, (field, index) => (
              <Field
                {...schema.properties[field]}
                id={fieldIndex !== undefined ? `${field}-${fieldIndex}` : field}
                fieldSet={defaultFieldset.title.toLowerCase()}
                focus={index === 0}
                value={schema.properties[field].value || formData[field]}
                required={schema.required.indexOf(field) !== -1}
                onChange={(id, value) => {
                  const name =
                    fieldIndex !== undefined
                      ? id.replace(`-${fieldIndex}`, '')
                      : id;
                  onChangeField(name, value);
                }}
                key={field}
                error={errors[field]}
                block={block}
              />
            ))}
          </Segment>
        </div>
      )}
      {other.map((fieldset, index) => (
        <Accordion fluid styled className="form" key={fieldset.id}>
          <div key={fieldset.id} id={`blockform-fieldset-${fieldset.id}`}>
            <Accordion.Title
              active={currentActiveFieldset === index}
              index={index}
              onClick={handleCurrentActiveFieldset}
            >
              {fieldset.title && <>{fieldset.title}</>}
              {currentActiveFieldset === index ? (
                <Icon name={upSVG} size="20px" />
              ) : (
                <Icon name={downSVG} size="20px" />
              )}
            </Accordion.Title>
            <Accordion.Content active={currentActiveFieldset === index}>
              <AnimateHeight
                animateOpacity
                duration={500}
                height={currentActiveFieldset === index ? 'auto' : 0}
              >
                <Segment className="attached">
                  {map(fieldset.fields, (field) => (
                    <Field
                      {...schema.properties[field]}
                      id={fieldIndex ? `${field}-${fieldIndex}` : field}
                      value={schema.properties[field].value || formData[field]}
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
              </AnimateHeight>
            </Accordion.Content>
          </div>
        </Accordion>
      ))}
      {footer}
    </MaybeWrap>
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
