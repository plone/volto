import type { Updater } from '@tanstack/react-form';
// import { Label, Radio, RadioGroup } from 'react-aria-components';
import { Label } from '../../Field/Field';
import { Radio, RadioGroup } from '@plone/components/tailwind';
import ByMonthDayField from './ByMonthDayField';
import { useAppForm } from '../../Form/Form';
import type { FormDefaultValues } from '../RecurrenceWidget';
import { useTranslation } from 'react-i18next';

interface RadioOptionsFieldProps {
  onChange: (updater: Updater<string>) => void;
  options: { id: string; title: string; description?: string }[];
  checkboxValue: string;
}

const RadioOptionsField = ({
  onChange,
  options,
  checkboxValue,
}: RadioOptionsFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <Label>{t('cmsui.recurrence.repeaton_label')}</Label>
      <RadioGroup
        onChange={(value) => onChange(value)}
        defaultValue={checkboxValue}
      >
        {options.map((opt) => {
          const { id, title, description } = opt;
          return (
            <Radio value={id} key={id}>
              <div>{title}</div>
              {description && <div>{description}</div>}
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default RadioOptionsField;
