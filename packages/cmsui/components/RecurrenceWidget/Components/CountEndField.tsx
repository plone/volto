import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../TextField/TextField';
import { Input } from '../../Field/Field';
import { Label } from 'react-aria-components';

interface CountEndFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const CountEndField = ({ onChange }: CountEndFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-x-6">
      <Label>{t('cmsui.recurrence.count_after')}</Label>
      <TextField
        inputMode="numeric"
        type="number"
        onChange={(e) => {
          const inputValue = Number(e);
          onChange(inputValue);
        }}
      >
        <Input />
      </TextField>
      <Label>{t('cmsui.recurrence.count_occurrences')}</Label>
    </div>
  );
};

export default CountEndField;
