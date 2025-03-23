import React from 'react';
import {
  FieldError,
  Group,
  Input,
  Label,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import { Button } from '../Button/Button';
import { AddIcon } from '../icons/AddIcon';
import { DashIcon } from '../icons/DashIcon';

export interface NumberFieldProps extends RACNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function NumberField({
  label,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) {
  return (
    <RACNumberField {...props}>
      <Label>{label}</Label>
      <Group>
        <Button slot="decrement">
          <DashIcon size="XS" />
        </Button>
        <Input />
        <Button slot="increment">
          <AddIcon size="XS" />
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}
