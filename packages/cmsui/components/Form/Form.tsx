import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import Quanta from './Field';

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    Quanta,
  },
  formComponents: {},
});
