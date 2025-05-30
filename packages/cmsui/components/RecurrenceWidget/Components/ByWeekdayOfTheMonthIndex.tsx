import { Button } from '@plone/components/tailwind';
import type { Updater } from '@tanstack/react-form';

import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { getLocalizedOrdinalNumber, ORDINAL_NUMBERS } from '../utils';
import { useTranslation } from 'react-i18next';

interface ByWeekdayOfTheMonthIndexProps {
  onChange: (updater: Updater<number>) => void;
}

const ByWeekdayOfTheMonthIndex = ({
  onChange,
}: ByWeekdayOfTheMonthIndexProps) => {
  const { t } = useTranslation();
  return (
    <Select
      onSelectionChange={(value) => {
        const indexValue = Number(value);
        onChange(indexValue);
      }}
    >
      <Button>
        <SelectValue />
      </Button>
      <Popover>
        <ListBox>
          {(
            Object.keys(ORDINAL_NUMBERS) as Array<keyof typeof ORDINAL_NUMBERS>
          ).map((numb) => (
            <ListBoxItem key={numb} id={numb}>
              {getLocalizedOrdinalNumber(ORDINAL_NUMBERS[numb], t)}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default ByWeekdayOfTheMonthIndex;
