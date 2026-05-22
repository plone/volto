import React from 'react';
import { type FormProps, Form as RACForm } from 'react-aria-components/Form';
import { twMerge } from 'tailwind-merge';

export function Form(props: FormProps) {
  return (
    <RACForm
      {...props}
      className={twMerge('flex flex-col items-start gap-2', props.className)}
    />
  );
}
