import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import { TextField, type TextFieldProps } from '../../TextField/TextField';

export function QuantaTextField(props: TextFieldProps) {
  return (
    <TextFieldContext.Provider value={{ className: 'q react-aria-TextField' }}>
      <TextField {...props} />
    </TextFieldContext.Provider>
  );
}
