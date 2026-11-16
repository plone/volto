/**
 * Modal form component.
 * @module components/manage/Form/ModalForm
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  dialogOpened: {
    id: 'Pop-up opened: {title}',
    defaultMessage: 'Pop-up opened: {title}',
  },
  dialogClosed: {
    id: 'Pop-up closed.',
    defaultMessage: 'Pop-up closed.',
  },
});

let idCounter = 0;

/**
 * Modal form component.
 */
const ModalForm = (props) => {
  const {
    schema,
    title,
    description,
    formData: formDataProp = {},
    submitError = null,
    onSubmit: onSubmitProp,
    onCancel,
    onChangeFormData,
    open = true,
    submitLabel = null,
    loading = null,
    loadingMessage = null,
    className = null,
    dimmer = null,
  } = props;

  const intl = useIntl();

  const [currentTab, setCurrentTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [isFormPristine, setIsFormPristine] = useState(true);
  const [formData, setFormData] = useState(formDataProp);

  const modalRef = useRef(null);
  const announceRef = useRef(null);
  const headerIdRef = useRef(`modal-title-${++idCounter}`);
  const prevOpenRef = useRef(open);
  const prevFormDataPropRef = useRef(formDataProp);
  const prevFormDataRef = useRef(formData);

  const headerId = headerIdRef.current;

  const onKeyDown = useCallback((event) => {
    if (event.key !== 'Tab') return;
    const modal = document
      .getElementById(headerIdRef.current)
      ?.closest('.ui.modal');
    if (!modal) return;
    const focusable = modal.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }, []);

  // Handle open/close transitions
  useEffect(() => {
    if (!prevOpenRef.current && open) {
      document.addEventListener('keydown', onKeyDown);
      modalRef.current?.focus();
      if (announceRef.current) {
        announceRef.current.textContent = intl.formatMessage(
          messages.dialogOpened,
          { title },
        );
      }
    }
    if (prevOpenRef.current && !open) {
      document.removeEventListener('keydown', onKeyDown);
      if (announceRef.current) {
        announceRef.current.textContent = intl.formatMessage(
          messages.dialogClosed,
        );
      }
    }
    prevOpenRef.current = open;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onKeyDown, intl, title]);

  // Notify parent of form data changes
  useEffect(() => {
    if (onChangeFormData) {
      if (!isEqual(prevFormDataRef.current, formData)) {
        onChangeFormData(formData);
      }
    }
    prevFormDataRef.current = formData;
  }, [formData, onChangeFormData]);

  // Sync form data from props
  useEffect(() => {
    if (!isEqual(prevFormDataPropRef.current, formDataProp)) {
      let newFormData = {};
      map(keys(formDataProp), (field) => {
        if (!isEqual(prevFormDataPropRef.current[field], formDataProp[field])) {
          newFormData[field] = formDataProp[field];
        }
      });
      setFormData((prev) => ({
        ...prev,
        ...newFormData,
      }));
    }
    prevFormDataPropRef.current = formDataProp;
  }, [formDataProp]);

  const onChangeField = useCallback((id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const onClickInput = useCallback(() => {
    setIsFormPristine(false);
  }, []);

  const onBlurField = useCallback(
    (id, value) => {
      if (!isFormPristine) {
        const newErrors = FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage: intl.formatMessage,
          touchedField: { [id]: value },
        });
        setErrors(newErrors);
      }
    },
    [isFormPristine, schema, formData, intl.formatMessage],
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newErrors = FormValidation.validateFieldsPerFieldset({
        schema,
        formData,
        formatMessage: intl.formatMessage,
      });

      if (keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        let setFormDataCallback = (newData) => {
          setFormData(newData);
          setErrors({});
        };
        onSubmitProp(formData, setFormDataCallback);
      }
    },
    [schema, formData, intl.formatMessage, onSubmitProp],
  );

  const selectTab = useCallback((event, { index }) => {
    setCurrentTab(index);
  }, []);

  const currentFieldset = schema.fieldsets[currentTab];

  const fields = currentFieldset
    ? map(currentFieldset.fields, (field) => ({
        ...schema.properties[field],
        id: field,
        value: formData[field],
        required: schema.required.indexOf(field) !== -1,
        onChange: onChangeField,
        onBlur: onBlurField,
        onClick: onClickInput,
      }))
    : [];

  const state_errors = keys(errors).length > 0;

  return (
    <>
      {/* aria-live region outside Modal so it persists through open/close cycles */}
      <div
        ref={announceRef}
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
        }}
      />
      <Modal
        role="dialog"
        dimmer={dimmer}
        open={open}
        className={className}
        aria-labelledby={headerId}
        aria-modal="true"
      >
        <Header id={headerId}>{title}</Header>
        <Dimmer active={loading}>
          <Loader>
            {loadingMessage || (
              <FormattedMessage id="Loading" defaultMessage="Loading." />
            )}
          </Loader>
        </Dimmer>
        <Modal.Content scrolling>
          {/* outline suppressed for programmatic focus via CSS :focus:not(:focus-visible) on .modal-focus-trap */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div ref={modalRef} tabIndex={-1} className="modal-focus-trap">
            <UiForm
              method="post"
              onSubmit={onSubmit}
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
          </div>
        </Modal.Content>
        <Modal.Actions>
          {onCancel && (
            <Button
              type="button"
              basic
              secondary
              aria-label={intl.formatMessage(messages.cancel)}
              title={intl.formatMessage(messages.cancel)}
              onClick={onCancel}
            >
              <Icon name={clearSVG} className="circled" size="30px" />
            </Button>
          )}
          <Button
            basic
            primary
            aria-label={
              submitLabel ? submitLabel : intl.formatMessage(messages.save)
            }
            title={
              submitLabel ? submitLabel : intl.formatMessage(messages.save)
            }
            onClick={onSubmit}
            loading={loading}
          >
            <Icon name={aheadSVG} className="contents circled" size="30px" />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
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

export default ModalForm;
