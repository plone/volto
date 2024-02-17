import React from 'react';
import {
  Button as bn,
  FieldError,
  Group,
  Input,
  Label,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  Text,
  ValidationResult,
} from 'react-aria-components';
import { Button } from '../Button/Button';
import { AddIcon } from '../Icons/AddIcon';
import { DashIcon } from '../Icons/DashIcon';

export interface NumberFieldProps extends AriaNumberFieldProps {
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
    <AriaNumberField {...props}>
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
    </AriaNumberField>
  );
}
