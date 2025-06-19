import { DatePicker } from '@plone/components/tailwind';
import type { Updater } from '@tanstack/react-form';

interface UntilEndFieldProps {
  onChange: (updater: Updater<string>) => void;
}

const UntilEndField = ({ onChange }: UntilEndFieldProps) => {
  return <DatePicker onChange={(value) => value && onChange(value)} />;
};
export default UntilEndField;
