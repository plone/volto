import { Select } from '@plone/components/quanta';
import type { Updater } from '@tanstack/react-form';

import { getOrdinalNumbersOptions, ORDINAL_NUMBERS } from '../utils';
import { useTranslation } from 'react-i18next';

interface ByWeekdayOfTheMonthIndexProps {
  onChange: (updater: Updater<number>) => void;
  defaultValue: keyof typeof ORDINAL_NUMBERS;
}

const ByWeekdayOfTheMonthIndex = ({
  onChange,
  defaultValue,
}: ByWeekdayOfTheMonthIndexProps) => {
  const { t } = useTranslation();
  return (
    <Select
      onChange={(value) => {
        const indexValue = Number(value);
        onChange(indexValue);
      }}
      defaultValue={Number(defaultValue)}
      items={getOrdinalNumbersOptions(t)}
    />
  );
};

export default ByWeekdayOfTheMonthIndex;
