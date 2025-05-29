import type { Updater } from '@tanstack/react-form';
import { Label, Radio, RadioGroup } from 'react-aria-components';

interface ByMonthFieldProps {
  onChange: (updater: Updater<string>) => void;
  label: string;
}

const ByMonthField = ({ label }: ByMonthFieldProps) => {
  return (
    <div className="flex">
      <Label>{label}</Label>
      <RadioGroup onChange={(value) => console.log(value)}>
        <Radio value="monthly-bymonthday">campo 1</Radio>
        <Radio value="monthly-byweekday">campo 2</Radio>
      </RadioGroup>
    </div>
  );
};

export default ByMonthField;
