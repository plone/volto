/**
 * Form component.
 * @module containers/Form
 */

import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import { omitBy } from 'lodash';

/**
 * Form component class.
 * @function Form
 * @returns {string} Markup of the component.
 */
const Form = ({ schema, formData, onSubmit }) => (
  <SchemaForm schema={{
                ...schema,
                required: ['title'],
              }}
              formData={omitBy(formData, item => item === null)}
              onSubmit={onSubmit}>
    <div className="formControls">
      <button className="context" type="submit">Save</button>
      <button type="button">Cancel</button>
    </div>
  </SchemaForm>
);

export default Form;
