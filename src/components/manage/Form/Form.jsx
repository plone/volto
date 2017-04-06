/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import { Fieldset, Tabs } from '../../../components';

/**
 * Form container class.
 * @class Form
 * @extends Component
 */
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
    }).isRequired,
    formData: PropTypes.objectOf(PropTypes.any),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    formData: {},
  }

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
   * @param {number} tab Selected tab
   * @returns {undefined}
   */
  selectTab(tab) {
    this.setState({
      currentTab: tab,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema, onCancel } = this.props;

    const fieldsets = map(schema.fieldsets, fieldset => ({
      ...fieldset,
      fields: map(fieldset.fields, field => ({
        ...schema.properties[field],
        id: field,
        value: this.state.formData[field],
        required: schema.required.indexOf(field) !== -1,
        onChange: this.onChangeField,
      })),
    }));

/*
    const parsedSchema = {
      ...schema,
      title: `Edit ${schema.title}`,
      required: [],
      properties: zipObject(
        map(schema.fieldsets, item => item.id),
        map(schema.fieldsets, item => ({
          title: item.title,
          type: 'object',
          properties: zipObject(
            item.fields,
            map(item.fields, field => schema.properties[field]),
          ),
        })),
      ),
    };

    const parsedFormData = zipObject(
      map(schema.fieldsets, item => item.id),
      map(schema.fieldsets, item =>
        omitBy(
          zipObject(
            item.fields,
            map(item.fields, field => formData[field]),
          ),
          field => !field,
        ),
      ),
    );
*/

    return (
      <form className="pat-autotoc autotabs" onSubmit={this.onSubmit}>
        <Tabs
          tabs={map(schema.fieldsets, item => item.title)}
          current={this.state.currentTab}
          selectTab={this.selectTab}
        />
        {fieldsets.map((fieldset, index) =>
          <Fieldset
            id={fieldset.id}
            title={fieldset.title}
            active={index === this.state.currentTab}
            fields={fieldset.fields}
            key={fieldset.id}
          />,
        )}
        <div className="formControls">
          <button className="context" type="submit">Save</button>
          &nbsp;
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}
