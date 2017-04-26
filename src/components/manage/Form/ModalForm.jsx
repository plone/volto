/**
 * Modal form component.
 * @module components/manage/Form/ModalForm
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Button, Form as UiForm, Header, Menu, Modal } from 'semantic-ui-react';

import { Field } from '../../../components';

/**
 * Modal form container class.
 * @class ModalForm
 * @extends Component
 */
export default class FormModal extends Component {
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
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
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
   * @constructs ModalForm
   */
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
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
    this.props.onSubmit(this.state.formData);
    event.preventDefault();
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
      <Modal open={this.props.open}>
        <Header>{this.props.title}</Header>
        <Modal.Content>
          <UiForm method="post" onSubmit={this.onSubmit}>
            {schema.fieldsets.length > 1 &&
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
              </Menu>}
            {fields.map(field => <Field {...field} key={field.id} />)}
          </UiForm>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onSubmit}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
