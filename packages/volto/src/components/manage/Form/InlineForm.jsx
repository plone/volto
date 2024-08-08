import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Segment, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import AnimateHeight from 'react-animate-height';
import { keys, map, isEqual } from 'lodash';
import { useAtom } from 'jotai';
import { inlineFormFieldsetsState } from './InlineFormState';
import {
  insertInArray,
  removeFromArray,
  arrayRange,
} from '@plone/volto/helpers/Utils/Utils';
import { Icon } from '@plone/volto/components';
import { Field } from '@plone/volto/components/manage/Form';
import { applySchemaDefaults } from '@plone/volto/helpers';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

import config from '@plone/volto/registry';

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
    onChangeFormData,
    onChangeField,
    schema,
    title,
    icon,
    headerActions,
    actionButton,
    footer,
    focusIndex,
    intl,
  } = props;
  const _ = intl.formatMessage;
  const defaultFieldset = schema.fieldsets.find((o) => o.id === 'default');
  const other = schema.fieldsets.filter((o) => o.id !== 'default');

  React.useEffect(() => {
    // Will set field values from schema, by matching the default values

    const objectSchema = typeof schema === 'function' ? schema(props) : schema;

    const initialData = applySchemaDefaults({
      data: formData,
      schema: objectSchema,
      intl,
    });

    if (onChangeFormData) {
      onChangeFormData(initialData);
    } else {
      Object.keys(initialData).forEach((k) => {
        if (!isEqual(initialData[k], formData?.[k])) {
          onChangeField(k, initialData[k]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentActiveFieldset, setCurrentActiveFieldset] = useAtom(
    inlineFormFieldsetsState({
      name: block,
      fielsetList: other,
      initialState: config.settings.blockSettingsTabFieldsetsInitialStateOpen
        ? arrayRange(0, other.length - 1, 1)
        : [],
    }),
  );

  function handleCurrentActiveFieldset(e, blockProps) {
    const { index } = blockProps;
    if (currentActiveFieldset.includes(index)) {
      setCurrentActiveFieldset(
        removeFromArray(
          currentActiveFieldset,
          currentActiveFieldset.indexOf(index),
        ),
      );
    } else {
      setCurrentActiveFieldset(
        insertInArray(
          currentActiveFieldset,
          index,
          currentActiveFieldset.length + 1,
        ),
      );
    }
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
              onChange={(id, value, itemInfo) => {
                onChangeField(id, value, itemInfo);
              }}
              key={field}
              error={errors?.[block]?.[field] || {}}
              block={block}
            />
          ))}
          {actionButton && (
            <Segment className="attached actions">{actionButton}</Segment>
          )}
        </Segment>
      </div>
      {other.map((fieldset, index) => (
        <Accordion fluid styled className="form" key={fieldset.id}>
          <div key={fieldset.id} id={`blockform-fieldset-${fieldset.id}`}>
            <Accordion.Title
              active={currentActiveFieldset.includes(index)}
              index={index}
              onClick={handleCurrentActiveFieldset}
            >
              {fieldset.title && <>{fieldset.title}</>}
              {currentActiveFieldset.includes(index) ? (
                <Icon name={upSVG} size="20px" />
              ) : (
                <Icon name={downSVG} size="20px" />
              )}
            </Accordion.Title>
            <Accordion.Content active={currentActiveFieldset.includes(index)}>
              <AnimateHeight
                animateOpacity
                duration={500}
                height={currentActiveFieldset.includes(index) ? 'auto' : 0}
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
                      error={errors?.[block]?.[field] || {}}
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
