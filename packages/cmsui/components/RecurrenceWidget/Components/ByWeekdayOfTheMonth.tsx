import { Select } from '@plone/components/quanta';
import { getDaysOptions } from '../utils';
import { useTranslation } from 'react-i18next';
import type { Updater } from '@tanstack/react-form';

interface ByWeekdayOfTheMonth {
  onChange: (updater: Updater<number>) => void;
  defaultValue: number;
}

const ByWeekdayOfTheMonth = ({
  onChange,
  defaultValue,
}: ByWeekdayOfTheMonth) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const daysOptions = getDaysOptions(currentLocale);
  return (
    <Select
      onChange={(value) =>
        value && typeof value === 'number' && onChange(value)
      }
      defaultValue={defaultValue}
      items={daysOptions}
    />
  );
};

export default ByWeekdayOfTheMonth;
