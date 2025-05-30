import type { Updater } from '@tanstack/react-form';
import { Label } from '../../Field/Field';
import { Radio, RadioGroup } from '@plone/components/tailwind';
import { widgetTailwindClasses } from '../utils';

interface RadioOptionsFieldProps {
  label: string;
  onChange: (updater: Updater<string>) => void;
  options: { id: string; title: string; description?: string }[];
  checkboxValue: string;
}

const RadioOptionsField = ({
  label,
  onChange,
  options,
  checkboxValue,
}: RadioOptionsFieldProps) => {
  return (
    <div className={widgetTailwindClasses.fieldComponent}>
      <Label className={widgetTailwindClasses.labelComponent}>{label}</Label>
      <RadioGroup
        onChange={(value) => onChange(value)}
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
