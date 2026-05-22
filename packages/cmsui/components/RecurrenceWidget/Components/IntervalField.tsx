import { Group } from 'react-aria-components';
import { TextField, Input, Label } from '@plone/components/quanta';
import type { Updater } from '@tanstack/react-form';
import { widgetTailwindClasses } from '../utils';

interface IntervalFieldProps {
  labelAfter?: string;
  label: string;
  onChange: (updater: Updater<number>) => void;
}

const IntervalField = ({ labelAfter, label, onChange }: IntervalFieldProps) => {
  return (
    <div className={widgetTailwindClasses.fieldComponent}>
      <Label className={widgetTailwindClasses.labelComponent}>{label}</Label>
      <Group className="flex items-center gap-3">
        <TextField
          type="number"
          inputMode="numeric"
          onChange={(e) => {
            const inputValue = Number(e);
            onChange(inputValue);
          }}
          minValue={1}
          defaultValue="1"
        >
          <Input />
        </TextField>
        {labelAfter && <div>{labelAfter}</div>}
      </Group>
    </div>
  );
};

export default IntervalField;
