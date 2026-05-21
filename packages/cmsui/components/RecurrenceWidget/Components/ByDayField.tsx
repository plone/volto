import { Checkbox, CheckboxGroup } from 'react-aria-components';
import { Label } from '../../Field/Field';
import { Days, getLocalizedWeekday, widgetTailwindClasses } from '../utils';
import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

interface ByDayFieldProps {
  onChange: (updater: Updater<string[]>) => void;
  label: string;
  defaultValue: string;
}

const ByDayField = ({ label, onChange, defaultValue }: ByDayFieldProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <CheckboxGroup
      className={widgetTailwindClasses.fieldComponent}
      onChange={(value) => onChange(value)}
      defaultValue={[defaultValue]}
    >
      <Label className={widgetTailwindClasses.labelComponent}>{label}</Label>
      {(Object.keys(Days) as Array<keyof typeof Days>).map((d, i) => {
        return (
          <Checkbox
            key={d}
            value={d}
            className={twMerge(
              `
                flex h-12.5 w-12.5 items-center justify-center border-e border-t border-b
                hover:cursor-pointer hover:bg-muted-foreground/20
                focus:outline-2 focus:outline-quanta-cobalt
                data-[selected=true]:bg-muted-foreground/50
              `,
              i === 0 && 'border-l',
            )}
          >
            {getLocalizedWeekday(Days[d].weekday, currentLocale, 'short')}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

export default ByDayField;
