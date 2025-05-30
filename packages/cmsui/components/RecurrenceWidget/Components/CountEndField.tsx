import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../TextField/TextField';
import { Input } from '../../Field/Field';

interface CountEndFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const CountEndField = ({ onChange }: CountEndFieldProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {t('cmsui.recurrence.count_after')}
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
      {t('cmsui.recurrence.count_occurrences')}
    </div>
  );
};

export default CountEndField;
