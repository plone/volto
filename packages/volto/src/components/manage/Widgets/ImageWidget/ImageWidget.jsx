import React from 'react';

import { FormFieldWrapper } from '@plone/volto/components';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';

const ImageUploadWidget = (props) => {
  const { fieldSet, id, title } = props;
  return (
    <FormFieldWrapper
      {...props}
      columns={1}
      className="block image-upload-widget"
    >
      <div className="wrapper">
        <label
          id={`fieldset-${fieldSet}-field-label-${id}`}
          htmlFor={`field-${id}`}
        >
          {title}
        </label>
      </div>
      <ImageInput {...props} />
    </FormFieldWrapper>
  );
};

export default ImageUploadWidget;
