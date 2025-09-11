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
import { useFocusRing, useId } from 'react-aria';

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
  const { isFocusVisible, focusProps } = useFocusRing();
  const id = useId();
  return (
    <div>
      {label && <Label id={id}>{label}</Label>}
      <div
        {...focusProps}
        aria-labelledby={id}
        className={widgetStyles({
          isFocusVisible,
          isInvalid: !!props.errorMessage,
        })}
        role="group"
        tabIndex={0}
        // className="flex items-center justify-between gap-2"
      >
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

ObjectBrowserWidget.displayName = 'ObjectBrowserWidget';
