import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Segment, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import AnimateHeight from 'react-animate-height';
import { keys, map } from 'lodash';

import { Field, Icon } from '@plone/volto/components';
import { applySchemaEnhancer } from '@plone/volto/helpers';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

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

const InlineForm = (props) => {
  const {
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
    focusIndex,
    onChangeBlock,
    intl,
  } = props;
  const _ = intl.formatMessage;
  const defaultFieldset = schema.fieldsets.find((o) => o.id === 'default');
  const other = schema.fieldsets.filter((o) => o.id !== 'default');

  const objectSchema = typeof schema === 'function' ? schema(props) : schema;
  /**
   * Will set field values from schema, by matching the default values
   * @returns {Object} defaultValues
   */
  const setInitialData = React.useCallback(() => {
    const finalSchema = applySchemaEnhancer({
      schema: objectSchema,
      formData,
      intl,
    });
    const defaultValues = Object.keys(finalSchema.properties).reduce(
      (accumulator, currentField) => {
        return finalSchema.properties[currentField].default
          ? {
              ...accumulator,
              [currentField]: finalSchema.properties[currentField].default,
            }
          : accumulator;
      },
      {},
    );

    return {
      ...defaultValues,
      ...formData,
    };
  }, [formData, intl, objectSchema]);

  const [initialized, setInitialized] = React.useState();

  React.useEffect(() => {
    if (!initialized) {
      onChangeBlock && onChangeBlock(block, { ...setInitialData() });
      setInitialized(true);
    }
  }, [initialized, block, onChangeBlock, setInitialData]);

  const [currentActiveFieldset, setCurrentActiveFieldset] = React.useState(0);
  function handleCurrentActiveFieldset(e, blockProps) {
    const { index } = blockProps;
    const newIndex = currentActiveFieldset === index ? -1 : index;

    setCurrentActiveFieldset(newIndex);
  }

  return (
    <div className="ui form">
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

      <div id={`blockform-fieldset-${defaultFieldset.id}`}>
        <Segment className="form attached">
          {map(defaultFieldset.fields, (field, index) => (
            <Field
              {...schema.properties[field]}
              id={field}
              fieldSet={defaultFieldset.title.toLowerCase()}
              focus={index === focusIndex}
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
              </AnimateHeight>
            </Accordion.Content>
          </div>
        </Accordion>
      ))}
      {footer}
    </div>
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
  focusIndex: null,
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
  focusIndex: PropTypes.number,
};

export default injectIntl(InlineForm, { forwardRef: true });
