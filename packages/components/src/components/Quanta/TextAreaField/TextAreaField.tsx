import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import {
  TextAreaField as BasiqTextAreaField,
  TextAreaFieldProps as BasiqTextAreaFieldProps,
} from '../../TextAreaField/TextAreaField';

export function TextAreaField(props: BasiqTextAreaFieldProps) {
  return (
    <TextFieldContext.Provider
      value={{ className: 'q react-aria-TextAreaField' }}
    >
      <BasiqTextAreaField {...props} />
    </TextFieldContext.Provider>
  );
}
