import type { Updater } from '@tanstack/react-form';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { getLocalizedMonth, months } from '../utils';
import { Button } from '@plone/components/tailwind';

interface MonthOfTheYearFieldProps {
  onChange: (updater: Updater<number>) => void;
}

const MonthOfTheYearField = ({ onChange }: MonthOfTheYearFieldProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <Select
      onSelectionChange={(value) =>
        value && typeof value === 'number' && onChange(value)
      }
    >
      <Button>
        <SelectValue />
      </Button>
      <Popover>
        <ListBox>
          {months.map((m) => (
            <ListBoxItem key={m} id={m}>
              {getLocalizedMonth(m, currentLocale, 'long')}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default MonthOfTheYearField;
