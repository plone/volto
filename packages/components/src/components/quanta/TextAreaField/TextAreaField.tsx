import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import {
  TextAreaField,
  type TextAreaFieldProps,
} from '../../TextAreaField/TextAreaField';

export function QuantaTextAreaField(props: TextAreaFieldProps) {
  return (
    <TextFieldContext.Provider
      value={{ className: 'q react-aria-TextAreaField' }}
    >
      <TextAreaField {...props} />
    </TextFieldContext.Provider>
  );
}
