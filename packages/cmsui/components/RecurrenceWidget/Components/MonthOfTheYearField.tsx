import type { Updater } from '@tanstack/react-form';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { getLocalizedMonth, months, widgetTailwindClasses } from '../utils';
import { Button } from '@plone/components/quanta';
import ChevronDown from '@plone/components/icons/chevron-down.svg?react';

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
  return (
    <Select
      onSelectionChange={(value) =>
        value && typeof value === 'number' && onChange(value)
      }
      defaultSelectedKey={defaultValue}
    >
      <Button className={widgetTailwindClasses.selectButton}>
        <SelectValue className="text-[1rem]" defaultValue={1} />
        <ChevronDown />
      </Button>
      <Popover className={widgetTailwindClasses.selectPopover}>
        <ListBox>
          {months.map((m) => (
            <ListBoxItem
              key={m}
              id={m}
              className={widgetTailwindClasses.listBoxItem}
            >
              {getLocalizedMonth(m, currentLocale, 'long')}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default MonthOfTheYearField;
