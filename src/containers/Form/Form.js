/**
 * Form component.
 * @module containers/Form
 */

import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import { omitBy } from 'lodash';

import { WysiwygWidget } from '../../containers';

const widgets = {
  WysiwygWidget,
};

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
              uiSchema={{
                text: {
                  "ui:widget": WysiwygWidget,
                }
              }}
              formData={omitBy(formData, item => item === null)}
              widgets={widgets}
              onSubmit={onSubmit}>
    <div className="formControls">
      <button className="context" type="submit">Save</button>
      &nbsp;
      <button type="button">Cancel</button>
    </div>
  </SchemaForm>
);

export default Form;
