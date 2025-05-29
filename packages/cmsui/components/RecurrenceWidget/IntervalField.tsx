import { Group } from 'react-aria-components';
import { Input, Label } from '../Field/Field';
import type { FieldApi, Updater } from '@tanstack/react-form';

interface IntervalFieldProps {
  labelAfter?: string;
  label: string;
  onChange: (updater: Updater<number>) => void;
}

const IntervalField = ({ labelAfter, label, onChange }: IntervalFieldProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <Group>
        <Input
          type="number"
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
        {labelAfter && <div>{labelAfter}</div>}
      </Group>
    </div>
  );
};

export default IntervalField;
