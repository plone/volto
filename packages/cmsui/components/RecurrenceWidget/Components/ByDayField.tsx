import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from 'react-aria-components';
import { Label } from '../../Field/Field';
import { Days, getLocalizedWeekday } from '../utils';
import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';

interface ByDayFieldProps {
  onChange: (updater: Updater<string[]>) => void;
  label: string;
}

const ByDayField = ({ label, onChange }: ByDayFieldProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <CheckboxGroup className="flex" onChange={(value) => onChange(value)}>
      <Label>{label}</Label>
      {(Object.keys(Days) as Array<keyof typeof Days>).map((d) => {
        return (
          <Checkbox
            key={d}
            value={d}
            className={
              'data-selected:bg-muted-background flex h-[50px] w-[50px] items-center justify-center hover:cursor-pointer'
            }
          >
            {getLocalizedWeekday(Days[d].weekday, currentLocale, 'short')}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

export default ByDayField;
