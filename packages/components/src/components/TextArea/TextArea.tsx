import type { TextFieldProps } from 'react-aria-components';
import {
  FieldError,
  Label,
  Text,
  TextField,
  TextArea as RACTextArea,
} from 'react-aria-components';
import cx from 'classnames';

interface InputProps extends TextFieldProps {
  title?: string;
  description?: string;
  error?: string[];
  placeholder: string;
}

export default function Input({
  title,
  description,
  error,
  ...props
}: InputProps) {
  return (
    <TextField {...props} className={cx('q field', `field-${props.name}`)}>
      <RACTextArea className={cx('q textarea input', { error: error })} />
      <Label className="q label">{title}</Label>
      <div className="resizer"></div>
      {description && (
        <Text slot="description" className="q hint">
          {description}
        </Text>
      )}
      <FieldError className="q assist">{error}</FieldError>
    </TextField>
  );
}
