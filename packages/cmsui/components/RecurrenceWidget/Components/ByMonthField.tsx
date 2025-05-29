import type { Updater } from '@tanstack/react-form';
// import { Label, Radio, RadioGroup } from 'react-aria-components';
import { Label } from '../../Field/Field';
import { Radio, RadioGroup } from '@plone/components/tailwind';
import ByMonthDayField from './ByMonthDayField';
import { useAppForm } from '../../Form/Form';
import type { FormDefaultValues } from '../RecurrenceWidget';
import { useTranslation } from 'react-i18next';

interface ByMonthFieldProps {
  onChange: (updater: Updater<string>) => void;
  label: string;
  defaultValues: FormDefaultValues;
}

const ByMonthField = ({
  label,
  onChange,
  defaultValues,
}: ByMonthFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <Label>{label}</Label>
      <RadioGroup onChange={(value) => onChange(value)}>
        <Radio value="bymonthday">
          <div>{t('cmsui.recurrence.bymonthday')}</div>
          <div>{t('cmsui.recurrence.bymonthday_description')}</div>
        </Radio>
        <Radio value="byweekday">
          <div>{t('cmsui.recurrence.byweekday')}</div>
          <div>{t('cmsui.recurrence.byweekday_description')}</div>
        </Radio>
      </RadioGroup>
    </div>
  );
};

export default ByMonthField;
