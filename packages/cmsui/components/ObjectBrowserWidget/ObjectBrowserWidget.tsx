import type { BaseFormFieldProps } from '../TextField/TextField';
import {
  Description,
  fieldBorderStyles,
  FieldError,
  Label,
} from '../Field/Field';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';
import { useLoaderData } from 'react-router';
import type { loader as editLoader } from '../../routes/edit';
import { ObjectBrowserProvider } from './ObjectBrowserContext';
import { ObjectBrowserTags } from './ObjectBrowserTags';
import { ObjectBrowserTrigger } from './ObjectBrowserTrigger';
import { ObjectBrowserModal } from './ObjectBrowserModal';

const widgetStyles = tv({
  extend: focusRing,
  base: 'flex items-center justify-between gap-2 rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

interface ObjectBrowserWidgetProps extends BaseFormFieldProps {}
// TODO: guarda selected_attrs dal teaser: sono configurabili e devi quantomeno passare il brain o la def dei selectedAttrs
export function ObjectBrowserWidgetComponent(props: ObjectBrowserWidgetProps) {
  const { label, description, errorMessage, ...rest } = props;
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className={widgetStyles()}>
        <ObjectBrowserTags />
        <ObjectBrowserTrigger>
          <ObjectBrowserModal />
        </ObjectBrowserTrigger>
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
}

export function ObjectBrowserWidget(props: ObjectBrowserWidgetProps) {
  const { content } = useLoaderData<typeof editLoader>();
  const { label, description, errorMessage, ...rest } = props;
  return (
    <ObjectBrowserProvider config={{ ...rest, initialPath: content?.['@id'] }}>
      <ObjectBrowserWidgetComponent {...{ label, description, errorMessage }} />
    </ObjectBrowserProvider>
  );
}
