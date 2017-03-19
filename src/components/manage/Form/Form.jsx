/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { PropTypes } from 'react';
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
    <SchemaForm
      method="post"
      schema={parsedSchema}
      uiSchema={{
        default: {
          text: {
            'ui:widget': WysiwygWidget,
          },
        },
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
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Form.propTypes = {
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
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Form.defaultProps = {
  formData: {},
};

export default Form;
