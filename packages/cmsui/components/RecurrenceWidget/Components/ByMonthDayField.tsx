import { Input } from '@plone/components/tailwind';
import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { FieldError } from '../../Field/Field';
import { TextField } from '../../TextField/TextField';

interface ByMonthDayFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const ByMonthDayField = ({ onChange }: ByMonthDayFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex items-center gap-4">
        {t('cmsui.recurrence.day_label')}
        <TextField
          inputMode="numeric"
          type="number"
          onChange={(e) => {
            const inputValue = Number(e);
            onChange(inputValue);
          }}
          validate={(value) =>
            Number(value) > 31 ? t('cmsui.recurrence.monthdayError') : null
          }
        >
          <Input />
        </TextField>
        {t('cmsui.recurrence.ofmonth_label')}
      </div>
    </div>
  );
};

export default ByMonthDayField;
