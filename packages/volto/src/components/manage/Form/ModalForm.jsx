/**
 * Modal form component.
 * @module components/manage/Form/ModalForm
 */

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import map from 'lodash/map';
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
import FormValidation from '@plone/volto/helpers/FormValidation/FormValidation';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Field } from '@plone/volto/components/manage/Form';
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

/**
 * Modal form container class.
 * @class ModalForm
 * @extends Component
 */
function ModalForm(props) {
  const {
    schema,
    title,
    description,
    formData,
    submitError,
    onSubmit,
    onCancel,
    onChangeFormData,
    open,
    submitLabel,
    loading,
    loadingMessage,
    dimmer,
    className,
  } = props;

  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [isFormPristine, setIsFormPristine] = useState(true);
  const [formDataState, setFormDataState] = useState(formData);
  const prevFormDataRef = useRef(formData);
  const prevFormDataStateRef = useRef(formDataState);

  const onChangeField = (id, value) => {
    setFormDataState({
      ...formDataState,
      [id]: value,
    });
  };

  const onClickInput = (e) => {
    setIsFormPristine(false);
  };

  /**
   * Validate fields on blur
   * @method onBlurField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  const onBlurField = (id, value) => {
    if (!isFormPristine) {
      const validationErrors = FormValidation.validateFieldsPerFieldset({
        schema,
        formData: formDataState,
        formatMessage: intl.formatMessage,
        touchedField: { [id]: value },
      });

      setErrors(validationErrors);
    }
  };

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = FormValidation.validateFieldsPerFieldset({
      schema,
      formData: formDataState,
      formatMessage: intl.formatMessage,
    });

    if (keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const setFormDataCallback = (newFormData) => {
        setFormDataState(newFormData);
        setErrors({});
      };
      onSubmit(formDataState, setFormDataCallback);
    }
  };

  /**
   * Select tab handler
   * @method selectTab
   * @param {Object} event Event object.
   * @param {number} index Selected tab index.
   * @returns {undefined}
   */
  const selectTab = (event, { index }) => {
    setCurrentTab(index);
  };

  /**
   * Handle onChangeFormData callback when formDataState changes
   */
  useEffect(() => {
    if (
      onChangeFormData &&
      !isEqual(prevFormDataStateRef.current, formDataState)
    ) {
      onChangeFormData(formDataState);
    }
    prevFormDataStateRef.current = formDataState;
  }, [formDataState, onChangeFormData]);

  /**
   * Handle formData prop changes - merge only changed fields into state
   */
  useEffect(() => {
    if (!isEqual(prevFormDataRef.current, formData)) {
      const newFormData = {};
      map(keys(formData), (field) => {
        if (!isEqual(prevFormDataRef.current[field], formData[field])) {
          newFormData[field] = formData[field];
        }
      });
      setFormDataState((prevFormDataState) => ({
        ...prevFormDataState,
        ...newFormData,
      }));
      prevFormDataRef.current = formData;
    }
  }, [formData]);

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  const currentFieldset = schema.fieldsets[currentTab];

  const fields = currentFieldset
    ? map(currentFieldset.fields, (field) => ({
        ...schema.properties[field],
        id: field,
        value: formDataState[field],
        required: schema.required.indexOf(field) !== -1,
        onChange: onChangeField,
        onBlur: onBlurField,
        onClick: onClickInput,
      }))
    : [];

  const state_errors = keys(errors).length > 0;
  return (
    <Modal dimmer={dimmer} open={open} className={className}>
      <Header>{title}</Header>
      <Dimmer active={loading}>
        <Loader>
          {loadingMessage || (
            <FormattedMessage id="Loading" defaultMessage="Loading." />
          )}
        </Loader>
      </Dimmer>
      <Modal.Content scrolling>
        <UiForm
          method="post"
          onSubmit={handleSubmit}
          error={state_errors || Boolean(submitError)}
        >
          {description}
          <Message error>
            {state_errors ? (
              <FormattedMessage
                id="There were some errors."
                defaultMessage="There were some errors."
              />
            ) : (
              ''
            )}
            <div>{submitError}</div>
          </Message>
          {schema.fieldsets?.length > 1 && (
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
            submitLabel ? submitLabel : intl.formatMessage(messages.save)
          }
          title={submitLabel ? submitLabel : intl.formatMessage(messages.save)}
          onClick={handleSubmit}
          loading={loading}
        >
          <Icon name={aheadSVG} className="contents circled" size="30px" />
        </Button>
        {onCancel && (
          <Button
            type="button"
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
}

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
  description: PropTypes.objectOf(PropTypes.any),
  formData: PropTypes.objectOf(PropTypes.any),
  submitError: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onChangeFormData: PropTypes.func,
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
