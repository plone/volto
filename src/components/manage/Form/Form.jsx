/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { PropTypes, Component } from 'react';
import SchemaForm from 'react-jsonschema-form';
import { merge, values, omitBy, zipObject, map } from 'lodash';

import { Field, Tabs, TextWidget, WysiwygWidget } from '../../../components';

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
    };
    this.selectTab = this.selectTab.bind(this);
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
    const { schema, formData, onSubmit, onCancel } = this.props;
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

    return (
      <div className="autotabs">
        <Tabs
          tabs={map(schema.fieldsets, item => item.title)}
          current={this.state.currentTab}
          selectTab={this.selectTab}
        />
        <SchemaForm
          method="post"
          schema={parsedSchema}
          FieldTemplate={Field}
          uiSchema={{
            default: {
              text: {
                'ui:widget': WysiwygWidget,
              },
            },
          }}
          widgets={{
            TextWidget,
          }}
          formData={parsedFormData}
          onSubmit={data => onSubmit(merge(...values(data.formData)))}
        >
          <div className="formControls">
            <button className="context" type="submit">Save</button>
            &nbsp;
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </SchemaForm>
      </div>
    );
  }
}
