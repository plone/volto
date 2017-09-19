/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, uniq } from 'lodash';
import {
  Button,
  Form as UiForm,
  Menu,
  Segment,
  Message,
} from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

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
});

/**
 * Form container class.
 * @class Form
 * @extends Component
 */
@injectIntl
export default class Form extends Component {
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
    onCancel: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    formData: {},
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
    event.preventDefault();
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

    const fields = map(currentFieldset.fields, field => ({
      ...schema.properties[field],
      id: field,
      value: this.state.formData[field],
      required: schema.required.indexOf(field) !== -1,
      onChange: this.onChangeField,
    }));

    return (
      <UiForm
        method="post"
        onSubmit={this.onSubmit}
        error={keys(this.state.errors).length > 0}
      >
        <Message error>
          <FormattedMessage
            id="There were some errors."
            defaultMessage="There were some errors."
          />
        </Message>
        {schema.fieldsets.length > 1 && (
          <Menu attached="top" tabular stackable>
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
        <Segment attached>
          {fields.map(field => (
            <Field
              {...field}
              key={field.id}
              error={this.state.errors[field.id]}
            />
          ))}
        </Segment>
        <Segment attached="bottom">
          <Button primary type="submit">
            <FormattedMessage id="Save" defaultMessage="Save" />
          </Button>
          <Button onClick={onCancel}>
            <FormattedMessage id="Cancel" defaultMessage="Cancel" />
          </Button>
        </Segment>
      </UiForm>
    );
  }
}
