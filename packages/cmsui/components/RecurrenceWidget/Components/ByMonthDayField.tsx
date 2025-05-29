import { Input } from '@plone/components/tailwind';
import type { Updater } from '@tanstack/react-form';

interface ByMonthDayFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const ByMonthDayField = ({ onChange }: ByMonthDayFieldProps) => {
  return (
    <div>
      day
      <Input type="number" onChange={(e) => onChange(e.target.valueAsNumber)} />
      of month
    </div>
  );
};

export default ByMonthDayField;
