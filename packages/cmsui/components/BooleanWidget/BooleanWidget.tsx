import type { FormWidgetProps } from '@plone/types';
import { Checkbox } from '@plone/components/quanta';
import { Description } from '../Field/Field';

type BooleanWidgetProps = FormWidgetProps<boolean> & {
  error?: unknown[];
};

const getErrorMessage = ({
  errorMessage,
  errors,
  error,
}: Pick<BooleanWidgetProps, 'errorMessage' | 'errors' | 'error'>) =>
  errorMessage ??
  (errors ?? error)
    ?.filter(Boolean)
    .map((value) => String(value))
    .join(', ');

export function BooleanWidget({
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  label,
  description,
  errorMessage,
  errors,
  error,
  required,
  disabled,
  readOnly,
  className,
}: BooleanWidgetProps) {
  const resolvedErrorMessage = getErrorMessage({
    errorMessage,
    errors,
    error,
  });

  return (
    <div className={className}>
      <Checkbox
        name={name}
        isSelected={!!value}
        defaultSelected={!!defaultValue}
        isRequired={required}
        isDisabled={disabled}
        isReadOnly={readOnly}
        isInvalid={!!resolvedErrorMessage}
        onBlur={onBlur}
        onChange={onChange}
      >
        {label}
      </Checkbox>
      {description && <Description>{description}</Description>}
      {resolvedErrorMessage && (
        <p
          className={`
            text-xs font-normal text-quanta-candy
            forced-colors:text-[Mark]
          `}
        >
          {resolvedErrorMessage}
        </p>
      )}
    </div>
  );
}

BooleanWidget.displayName = 'BooleanWidget';
