import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { TextField, Label, Input } from '@plone/components/quanta';
// import { Input } from '../../Field/Field';

interface CountEndFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const CountEndField = ({ onChange }: CountEndFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-x-6">
      <Label className="text-base">{t('cmsui.recurrence.count_after')}</Label>
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
      <Label className="text-base">
        {t('cmsui.recurrence.count_occurrences')}
      </Label>
      <div className="mt-2 basis-full text-sm text-muted-foreground">
        {t('cmsui.recurrence.infinite_occurrences')}
      </div>
    </div>
  );
};

export default CountEndField;
