import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { keys, map } from 'lodash';
import {
  Button,
  Form as UiForm,
  Header,
  Menu,
  Message,
  Modal,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { FormValidation } from '@plone/volto/helpers';
import { Field, Icon } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  required: {
    id: 'Required input is missing.',
    defaultMessage: 'Required input is missing.',
  },
  minLength: {
    id: 'Minimum length is {len}.',
    defaultMessage: 'Minimum length is {len}.',
  },
  uniqueItems: {
    id: 'Items must be unique.',
    defaultMessage: 'Items must be unique.',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const ModalForm = (props) => {
  const intl = useIntl();
  const [currentTab, setcurrentTab] = useState(0);
  const [errors, seterrors] = useState({});
  const [isFormPristine, setisFormPristine] = useState(true);
  const [formData, setformData] = useState(props.formData);

  const onChangeField = (id, value) => {
    setformData({
      ...formData,
      [id]: value,
    });
  };

  const onClickInput = (e) => {
    setisFormPristine(false);
  };

  const onBlurField = (id, value) => {
    if (!isFormPristine) {
      const errors = FormValidation.validateFieldsPerFieldset({
        schema: props.schema,
        formData: formData,
        formatMessage: intl.formatMessage,
        touchedField: { [id]: value },
      });
      seterrors(errors);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = FormValidation.validateFieldsPerFieldset({
      schema: props.schema,
      formData: formData,
      formatMessage: intl.formatMessage,
    });

    if (keys(errors).length > 0) {
      seterrors(errors);
    } else {
      let setFormDataCallback = (formData) => {
        setformData(formData);
        seterrors({});
      };
      props.onSubmit(formData, setFormDataCallback);
    }
  };

  const selectTab = (event, { index }) => {
    setcurrentTab(index);
  };

  const { schema, onCancel } = props;
  const currentFieldset = schema.fieldsets[currentTab];

  const fields = map(currentFieldset.fields, (field) => ({
    ...schema.properties[field],
    id: field,
    value: formData[field],
    required: schema.required.indexOf(field) !== -1,
    onChange: onChangeField,
    onBlur: onBlurField,
    onClick: onClickInput,
  }));

  const state_errors = keys(errors).length > 0;
  return (
    <Modal dimmer={props.dimmer} open={props.open} className={props.className}>
      <Header>{props.title}</Header>
      <Dimmer active={props.loading}>
        <Loader>
          {props.loadingMessage || (
            <FormattedMessage id="Loading" defaultMessage="Loading." />
          )}
        </Loader>
      </Dimmer>
      <Modal.Content scrolling>
        <UiForm
          method="post"
          onSubmit={onSubmit}
          error={state_errors || Boolean(props.submitError)}
        >
          <Message error>
            {state_errors ? (
              <FormattedMessage
                id="There were some errors."
                defaultMessage="There were some errors."
              />
            ) : (
              ''
            )}
            <div>{props.submitError}</div>
          </Message>
          {schema.fieldsets.length > 1 && (
            <Menu tabular stackable>
              {map(schema.fieldsets, (item, index) => (
                <Menu.Item
                  name={item.id}
                  index={index}
                  key={item.id}
                  active={currentTab === index}
                  onClick={selectTab}
                >
                  {item.title}
                </Menu.Item>
              ))}
            </Menu>
          )}
          {fields.map((field) => (
            <Field
              {...field}
              key={field.id}
              onBlur={onBlurField}
              onClick={onClickInput}
              error={errors[field.id]}
            />
          ))}
        </UiForm>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          circular
          primary
          floated="right"
          aria-label={
            props.submitLabel
              ? props.submitLabel
              : intl.formatMessage(messages.save)
          }
          title={
            props.submitLabel
              ? props.submitLabel
              : intl.formatMessage(messages.save)
          }
          onClick={onSubmit}
          loading={props.loading}
        >
          <Icon name={aheadSVG} className="contents circled" size="30px" />
        </Button>
        {onCancel && (
          <Button
            basic
            circular
            secondary
            aria-label={intl.formatMessage(messages.cancel)}
            title={intl.formatMessage(messages.cancel)}
            floated="right"
            onClick={onCancel}
          >
            <Icon name={clearSVG} className="circled" size="30px" />
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
};

ModalForm.propTypes = {
  schema: PropTypes.shape({
    fieldsets: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
    properties: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  title: PropTypes.string.isRequired,
  formData: PropTypes.objectOf(PropTypes.any),
  submitError: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  submitLabel: PropTypes.string,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  className: PropTypes.string,
};

ModalForm.defaultProps = {
  submitLabel: null,
  onCancel: null,
  formData: {},
  open: true,
  loading: null,
  loadingMessage: null,
  submitError: null,
  className: null,
  dimmer: null,
};

export default ModalForm;
