import React from 'react';
import { map } from 'lodash';
import { Field } from '@plone/volto/components';

function FormFields({ schema, formData, onChangeField, onBlurField, onClickInput, errors }) {
  return (
    <>
      {map(schema.fieldsets[0].fields, (field) => (
        <Field
          {...schema.properties[field]}
          id={field}
          value={formData?.[field]}
          required={schema.required.indexOf(field) !== -1}
          onChange={onChangeField}
          onBlur={onBlurField}
          onClick={onClickInput}
          key={field}
          error={errors[field]}
        />
      ))}
    </>
  );
}

export default FormFields;
