import type { Updater } from '@tanstack/react-form';
import { Label } from '../../Field/Field';
import { Radio, RadioGroup } from '@plone/components/quanta';
import { widgetTailwindClasses } from '../utils';

interface RadioOptionsFieldProps<T extends string> {
  label: string;
  onChange: (updater: Updater<T>) => void;
  options: { id: T; title: string; description?: string }[];
  checkboxValue: T;
}

const RadioOptionsField = <T extends string>({
  label,
  onChange,
  options,
  checkboxValue,
}: RadioOptionsFieldProps<T>) => {
  return (
    <div className={widgetTailwindClasses.fieldComponent}>
      <Label className={widgetTailwindClasses.labelComponent}>{label}</Label>
      <RadioGroup
        onChange={(value) => onChange(value as T)}
        defaultValue={checkboxValue}
      >
        {options.map((opt) => {
          const { id, title, description } = opt;
          return (
            <Radio value={id} key={id}>
              <div className="ms-3 flex flex-col">
                <div className="text-[1rem]">{title}</div>
                {description && (
                  <div className="text-muted-foreground">{description}</div>
                )}
              </div>
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default RadioOptionsField;
