import { Group } from 'react-aria-components';
import { Input, Label } from '../../Field/Field';
import type { FieldApi, Updater } from '@tanstack/react-form';
import { TextField } from '../../TextField/TextField';

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
        <TextField
          type="number"
          inputMode="numeric"
          onChange={(e) => {
            const inputValue = Number(e);
            onChange(inputValue);
          }}
        >
          <Input />
          {labelAfter && <div>{labelAfter}</div>}
        </TextField>
      </Group>
    </div>
  );
};

export default IntervalField;
