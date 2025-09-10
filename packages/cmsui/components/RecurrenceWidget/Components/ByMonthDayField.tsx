import { Input } from '@plone/components/quanta';
import { useField, type Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { FieldError } from '../../Field/Field';
import { TextField } from '../../TextField/TextField';
import { useFormContext } from '../../Form/Form';

interface ByMonthDayFieldProps {
  onChange: (updater: Updater<number>) => void;
  defaultValue: number;
}

const ByMonthDayField = ({ onChange, defaultValue }: ByMonthDayFieldProps) => {
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
          minValue={1}
          defaultValue={defaultValue?.toString()}
        >
          <Input />
        </TextField>
        {t('cmsui.recurrence.ofmonth_label')}
      </div>
    </div>
  );
};

export default ByMonthDayField;
