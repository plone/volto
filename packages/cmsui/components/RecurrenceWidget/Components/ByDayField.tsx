import { Checkbox, CheckboxGroup } from 'react-aria-components';
import { Label } from '../../Field/Field';
import { Days, getLocalizedWeekday, widgetTailwindClasses } from '../utils';
import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import type { Weekday } from 'rrule';

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
              'data-[selected=true]:bg-muted-foreground/50 hover:bg-muted-foreground/20 focus:outline-quanta-cobalt flex h-[50px] w-[50px] items-center justify-center border-e-[1px] border-t-[1px] border-b-[1px] hover:cursor-pointer focus:outline-2',
              i === 0 && 'border-l-[1px]',
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
