import { Button } from '@plone/components/quanta';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { getLocalizedWeekday, Days, widgetTailwindClasses } from '../utils';
import { useTranslation } from 'react-i18next';
import type { Updater } from '@tanstack/react-form';
import ChevronDown from '@plone/components/icons/chevron-down.svg?react';

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
  return (
    <Select
      onSelectionChange={(value) =>
        value && typeof value === 'number' && onChange(value)
      }
      defaultSelectedKey={defaultValue}
    >
      <Button className={widgetTailwindClasses.selectButton}>
        <SelectValue className="text-[1rem]" />
        <ChevronDown />
      </Button>
      <Popover className={widgetTailwindClasses.selectPopover}>
        <ListBox>
          {(Object.keys(Days) as Array<keyof typeof Days>).map((d) => {
            return (
              <ListBoxItem
                key={Days[d].weekday}
                id={Days[d].weekday}
                className={widgetTailwindClasses.listBoxItem}
              >
                {getLocalizedWeekday(Days[d].weekday, currentLocale, 'long')}
              </ListBoxItem>
            );
          })}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default ByWeekdayOfTheMonth;
