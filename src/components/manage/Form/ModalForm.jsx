/**
 * Modal form component.
 * @module components/manage/Form/ModalForm
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, uniq } from 'lodash';
import {
  Button,
  Form as UiForm,
  Header,
  Menu,
  Message,
  Modal,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

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
    submitError: null,
    className: null,
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
      formData: props.formData,
    };
    this.selectTab = this.selectTab.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
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
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = {};
    map(this.props.schema.fieldsets, (fieldset) =>
      map(fieldset.fields, (fieldId) => {
        const field = this.props.schema.properties[fieldId];
        const data = this.state.formData[fieldId];
        if (this.props.schema.required.indexOf(fieldId) !== -1) {
          if (field.type !== 'boolean' && !data) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.required),
            );
          }
          if (field.minLength && data.length < field.minLength) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.minLength, {
                len: field.minLength,
              }),
            );
          }
        }
        if (field.uniqueItems && data && uniq(data).length !== data.length) {
          errors[fieldId] = errors[field] || [];
          errors[fieldId].push(
            this.props.intl.formatMessage(messages.uniqueItems),
          );
        }
      }),
    );
    if (keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      let setFormDataCallback = (formData) => {
        this.setState({ formData: formData });
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
    }));

    const state_errors = keys(this.state.errors).length > 0;
    return (
      <Modal open={this.props.open} className={this.props.className}>
        <Header>{this.props.title}</Header>
        <Modal.Content>
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
              <Field {...field} key={field.id} />
            ))}
          </UiForm>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            circular
            primary
            floated="right"
            icon={
              <Icon name={aheadSVG} className="contents circled" size="30px" />
            }
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
            size="big"
            onClick={this.onSubmit}
            loading={this.props.loading}
          />
          {onCancel && (
            <Button
              basic
              circular
              secondary
              icon={<Icon name={clearSVG} className="circled" size="30px" />}
              aria-label={this.props.intl.formatMessage(messages.cancel)}
              title={this.props.intl.formatMessage(messages.cancel)}
              floated="right"
              size="big"
              onClick={onCancel}
            />
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default injectIntl(ModalForm);
