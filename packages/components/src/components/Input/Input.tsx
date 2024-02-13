import type { TextFieldProps } from 'react-aria-components';
import {
  FieldError,
  Input as RACInput,
  Label,
  Text,
  TextField,
} from 'react-aria-components';
import cx from 'classnames';

interface InputProps extends TextFieldProps {
  title?: string;
  description?: string;
  error?: string[];
  className?: string;
  placeholder: string;
}

export default function Input({
  title,
  description,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <TextField
      {...props}
      className={cx('q field', `field-${props.name}`, className)}
      data-required={props.isRequired || undefined}
    >
      <RACInput className={cx('q input', { error: error })} />
      <Label className="q label">{title}</Label>
      <FieldError className="q assist">{error}</FieldError>
      {description && (
        <Text slot="description" className="q hint">
          {description}
        </Text>
      )}
    </TextField>
  );
}
