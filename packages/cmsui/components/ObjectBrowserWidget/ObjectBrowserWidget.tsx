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

// TODO: better styling
const widgetStyles = tv({
  extend: focusRing,
  base: 'mx-1 flex items-center justify-between gap-2 rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

interface ObjectBrowserWidgetProps extends BaseFormFieldProps {}
// TODO: interaction with plate and blocks schema
export function ObjectBrowserWidgetComponent(props: ObjectBrowserWidgetProps) {
  const { label, description, errorMessage } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const id = useId();
  return (
    <div className="group mb-4 flex flex-col gap-1">
      {label && (
        <Label
          id={id}
          className={`
            not-group-data-invalid:not-group-data-readonly:has-[+div:focus]:text-quanta-sapphire
          `}
        >
          {label}
        </Label>
      )}
      {/* // TODO: maybe find a better way to use focus and leverage group focus styles */}
      <div
        {...focusProps}
        aria-labelledby={id}
        className={widgetStyles({
          isFocusVisible,
          isInvalid: !!props.errorMessage,
        })}
        role="group"
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
