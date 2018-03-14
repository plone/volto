/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, uniq } from 'lodash';
import {
  Accordion,
  Button,
  Form as UiForm,
  Icon,
  Segment,
  Message,
} from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Field } from '../../../components';

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
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors.',
    defaultMessage: 'There were some errors.',
  },
});

/**
 * Form container class.
 * @class Form
 * @extends Component
 */
class Form extends Component {
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
    formData: PropTypes.objectOf(PropTypes.any),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    intl: intlShape.isRequired,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    formData: {},
    onCancel: null,
    submitLabel: null,
    resetAfterSubmit: false,
    title: null,
    description: null,
    error: null,
    loading: null,
    hideActions: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      formData: props.formData,
      errors: {},
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
    if (event) {
      event.preventDefault();
    }
    const errors = {};
    map(this.props.schema.fieldsets, fieldset =>
      map(fieldset.fields, fieldId => {
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
      this.props.onSubmit(this.state.formData);
      if (this.props.resetAfterSubmit) {
        this.setState({
          formData: this.props.formData,
        });
      }
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

    return (
      <UiForm
        method="post"
        onSubmit={this.onSubmit}
        error={keys(this.state.errors).length > 0}
      >
        <Segment.Group raised>
          {this.props.title && (
            <Segment className="primary">{this.props.title}</Segment>
          )}
          {keys(this.state.errors).length > 0 && (
            <Message
              icon="warning"
              negative
              attached
              header={this.props.intl.formatMessage(messages.error)}
              content={this.props.intl.formatMessage(
                messages.thereWereSomeErrors,
              )}
            />
          )}
          {this.props.error && (
            <Message
              icon="warning"
              negative
              attached
              header={this.props.intl.formatMessage(messages.error)}
              content={this.props.error.message}
            />
          )}
          {this.props.description && (
            <Segment secondary>{this.props.description}</Segment>
          )}
          {schema.fieldsets.length > 1 && (
            <Accordion styled fluid exclusive={false}>
              {map(schema.fieldsets, (item, index) => [
                <Accordion.Title
                  index={index}
                  onClick={this.selectTab}
                  active={this.state.currentTab === index}
                >
                  {item.title}
                  <Icon color="black" name="dropdown" />
                </Accordion.Title>,
                <Accordion.Content active={this.state.currentTab === index}>
                  {map(item.fields, field => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      value={this.state.formData[field]}
                      required={schema.required.indexOf(field) !== -1}
                      onChange={this.onChangeField}
                      key={field}
                      error={this.state.errors[field]}
                    />
                  ))}
                </Accordion.Content>,
              ])}
            </Accordion>
          )}
          {schema.fieldsets.length === 1 && (
            <Segment>
              {map(currentFieldset.fields, field => (
                <Field
                  {...schema.properties[field]}
                  id={field}
                  value={this.state.formData[field]}
                  required={schema.required.indexOf(field) !== -1}
                  onChange={this.onChangeField}
                  key={field}
                  error={this.state.errors[field]}
                />
              ))}
            </Segment>
          )}
          {!this.props.hideActions && (
            <Segment className="actions" clearing>
              <Button
                basic
                circular
                primary
                floated="right"
                icon="arrow right"
                type="submit"
                title={
                  this.props.submitLabel
                    ? this.props.submitLabel
                    : this.props.intl.formatMessage(messages.save)
                }
                size="big"
                loading={this.props.loading}
              />
              {onCancel && (
                <Button
                  basic
                  circular
                  secondary
                  icon="remove"
                  title={this.props.intl.formatMessage(messages.cancel)}
                  floated="right"
                  size="big"
                  onClick={onCancel}
                />
              )}
            </Segment>
          )}
        </Segment.Group>
      </UiForm>
    );
  }
}

export default injectIntl(Form, { withRef: true });
