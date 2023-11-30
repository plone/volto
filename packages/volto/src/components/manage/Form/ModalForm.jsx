/**
 * Modal form component.
 * @module components/manage/Form/ModalForm
 */

import React, { Component } from 'react';
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
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
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

/**
 * Modal form container class.
 * @class ModalForm
 * @extends Component
 */
class ModalForm extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
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

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ModalForm
   */
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      errors: {},
      isFormPristine: true,
      formData: props.formData,
    };
    this.selectTab = this.selectTab.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onBlurField = this.onBlurField.bind(this);
    this.onClickInput = this.onClickInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Change field handler
   * @method onChangeField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeField(id, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: value,
      },
    });
  }

  /**
   * If user clicks on input, the form will be not considered pristine
   * this will avoid onBlur effects without interraction with the form
   * @param {Object} e event
   */
  onClickInput(e) {
    this.setState({ isFormPristine: false });
  }

  /**
   * Validate fields on blur
   * @method onBlurField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onBlurField(id, value) {
    if (!this.state.isFormPristine) {
      const errors = FormValidation.validateFieldsPerFieldset({
        schema: this.props.schema,
        formData: this.state.formData,
        formatMessage: this.props.intl.formatMessage,
        touchedField: { [id]: value },
      });

      this.setState({
        errors,
      });
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = FormValidation.validateFieldsPerFieldset({
      schema: this.props.schema,
      formData: this.state.formData,
      formatMessage: this.props.intl.formatMessage,
    });

    if (keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      let setFormDataCallback = (formData) => {
        this.setState({ formData: formData, errors: {} });
      };
      this.props.onSubmit(this.state.formData, setFormDataCallback);
    }
  }

  /**
   * Select tab handler
   * @method selectTab
   * @param {Object} event Event object.
   * @param {number} index Selected tab index.
   * @returns {undefined}
   */
  selectTab(event, { index }) {
    this.setState({
      currentTab: index,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema, onCancel } = this.props;
    const currentFieldset = schema.fieldsets[this.state.currentTab];

    const fields = map(currentFieldset.fields, (field) => ({
      ...schema.properties[field],
      id: field,
      value: this.state.formData[field],
      required: schema.required.indexOf(field) !== -1,
      onChange: this.onChangeField,
      onBlur: this.onBlurField,
      onClick: this.onClickInput,
    }));

    const state_errors = keys(this.state.errors).length > 0;
    return (
      <Modal
        dimmer={this.props.dimmer}
        open={this.props.open}
        className={this.props.className}
      >
        <Header>{this.props.title}</Header>
        <Dimmer active={this.props.loading}>
          <Loader>
            {this.props.loadingMessage || (
              <FormattedMessage id="Loading" defaultMessage="Loading." />
            )}
          </Loader>
        </Dimmer>
        <Modal.Content scrolling>
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={state_errors || Boolean(this.props.submitError)}
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
              <div>{this.props.submitError}</div>
            </Message>
            {schema.fieldsets.length > 1 && (
              <Menu tabular stackable>
                {map(schema.fieldsets, (item, index) => (
                  <Menu.Item
                    name={item.id}
                    index={index}
                    key={item.id}
                    active={this.state.currentTab === index}
                    onClick={this.selectTab}
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
                onBlur={this.onBlurField}
                onClick={this.onClickInput}
                error={this.state.errors[field.id]}
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
              this.props.submitLabel
                ? this.props.submitLabel
                : this.props.intl.formatMessage(messages.save)
            }
            title={
              this.props.submitLabel
                ? this.props.submitLabel
                : this.props.intl.formatMessage(messages.save)
            }
            onClick={this.onSubmit}
            loading={this.props.loading}
          >
            <Icon name={aheadSVG} className="contents circled" size="30px" />
          </Button>
          {onCancel && (
            <Button
              basic
              circular
              secondary
              aria-label={this.props.intl.formatMessage(messages.cancel)}
              title={this.props.intl.formatMessage(messages.cancel)}
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
}

export default injectIntl(ModalForm);
