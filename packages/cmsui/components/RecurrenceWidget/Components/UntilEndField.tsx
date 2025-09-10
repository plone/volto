import { DatePicker } from '@plone/components/quanta';
import type { Updater } from '@tanstack/react-form';
import { useAtomValue } from 'jotai';
import { formAtom } from '../../../routes/atoms';

interface UntilEndFieldProps {
  onChange: (updater: Updater<string>) => void;
}

const UntilEndField = ({ onChange }: UntilEndFieldProps) => {
  const formContext = useAtomValue(formAtom);

  // @ts-ignore
  const endDate = new Date(formContext.end);
  const defaultYear = endDate.getFullYear();
  const defaultMonth = endDate.getMonth() + 1;
  const defaultDay = endDate.getDate();

  const defaultDate = endDate
    ? `${defaultYear}-0${defaultMonth}-${defaultDay}`
    : null;

  return (
    <DatePicker
      onChange={(value) => value && onChange(value)}
      defaultValue={defaultDate}
      className="**:dark:text-foreground"
      resettable={false}
    />
  );
};
export default UntilEndField;
