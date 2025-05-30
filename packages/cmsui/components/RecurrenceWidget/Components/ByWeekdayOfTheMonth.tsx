import { Button } from '@plone/components/tailwind';
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { getLocalizedWeekday, Days } from '../utils';
import { useTranslation } from 'react-i18next';
import type { Updater } from '@tanstack/react-form';

interface ByWeekdayOfTheMonth {
  onChange: (updater: Updater<number>) => void;
}

const ByWeekdayOfTheMonth = ({ onChange }: ByWeekdayOfTheMonth) => {
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
          {(Object.keys(Days) as Array<keyof typeof Days>).map((d) => {
            return (
              <ListBoxItem key={d} id={Days[d].weekday}>
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
