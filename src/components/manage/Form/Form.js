/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import { merge, values, omitBy, zipObject, map } from 'lodash';

import { WysiwygWidget } from '../../../components';

/**
 * Form component class.
 * @function Form
 * @returns {string} Markup of the component.
 */
const Form = ({ schema, formData, onSubmit, onCancel }) => {
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
          map(item.fields, item => schema.properties[item])
        )
      })),
    )
  };

  const parsedFormData = zipObject(
    map(schema.fieldsets, item => item.id),
    map(schema.fieldsets, item =>
      omitBy(
        zipObject(
          item.fields,
          map(item.fields, item => formData ? formData[item] : undefined)
        ),
        item => !item
      )
    )
  );

  return (
    <SchemaForm schema={parsedSchema}
                uiSchema={{
                  default: {
                    text: {
                      "ui:widget": WysiwygWidget,
                    }
                  }
                }}
                formData={parsedFormData}
                onSubmit={data => onSubmit(merge(...values(data.formData)))}>
      <div className="formControls">
        <button className="context" type="submit">Save</button>
        &nbsp;
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </SchemaForm>
  );
}

export default Form;
