import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import {
  TextField as BasiqTextField,
  TextFieldProps as BasiqTextFieldProps,
} from '../../TextField/TextField';

export function TextField(props: BasiqTextFieldProps) {
  return (
    <TextFieldContext.Provider value={{ className: 'q react-aria-TextField' }}>
      <BasiqTextField {...props} />
    </TextFieldContext.Provider>
  );
}
