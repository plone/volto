import type { Updater } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { Select } from '@plone/components/quanta';
import { getMonthOptions } from '../utils';

interface MonthOfTheYearFieldProps {
  onChange: (updater: Updater<number>) => void;
  defaultValue: number;
}

const MonthOfTheYearField = ({
  onChange,
  defaultValue,
}: MonthOfTheYearFieldProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const months = getMonthOptions(currentLocale);
  return (
    <Select
      onChange={(value) =>
        value && typeof value === 'number' && onChange(value)
      }
      defaultValue={defaultValue}
      items={months}
    />
  );
};

export default MonthOfTheYearField;
