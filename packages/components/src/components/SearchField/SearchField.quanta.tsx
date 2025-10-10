import React from 'react';

import { SearchIcon } from '../icons/SearchIcon';
import { CloseIcon } from '../icons/CloseIcon';

import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { Button } from '../Button/Button.quanta';
import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from '../Field/Field.quanta';
import { composeTailwindRenderProps } from '../utils';

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex min-w-[40px] flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <SearchIcon
          aria-hidden
          className={`
            ml-2 text-gray-500
            group-disabled:text-gray-200
            forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]
          `}
        />
        <Input
          placeholder={placeholder}
          className="[&::-webkit-search-cancel-button]:hidden"
        />
        <Button
          className={`
            mr-2
            group-empty:invisible
          `}
        >
          <CloseIcon size="sm" aria-hidden />
        </Button>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
