import {
  DialogTrigger,
  Group,
  Heading,
  ListBox,
  ListBoxItem,
  ModalOverlay,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';

import { useMemo } from 'react';
import { Label } from '../Field/Field';
import { useAppForm } from '../Form/Form';
import EditIcon from '@plone/components/icons/edit.svg?react';

import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import {
  byMonthOptions,
  byYearOptions,
  Days,
  getWeekday,
  isFrequency,
  MONDAYFRIDAY_DAYS,
  months,
  OPTIONS,
  ORDINAL_NUMBERS,
  recurrenceEndOptions,
  WEEKLY_DAYS,
  widgetTailwindClasses,
  type Frequency,
  type MonthlyOption,
  type RecurrenceEndOption,
  type YearlyOption,
} from './utils';
import { useForm, useStore } from '@tanstack/react-form';
import IntervalField from './Components/IntervalField';
import ByDayField from './Components/ByDayField';
import ByMonthDayField from './Components/ByMonthDayField';
import { Button, FieldGroup } from '@plone/components/quanta';
import ByWeekdayOfTheMonth from './Components/ByWeekdayOfTheMonth';
import ByWeekdayOfTheMonthIndex from './Components/ByWeekdayOfTheMonthIndex';
import RadioOptionsField from './Components/RadioOptionsField';
import MonthOfTheYearField from './Components/MonthOfTheYearField';
import CountEndField from './Components/CountEndField';
import UntilEndField from './Components/UntilEndField';

import {
  RRuleSet,
  rrulestr,
  RRule,
  type Options,
  type WeekdayStr,
} from 'rrule';
import { useAtomValue } from 'jotai';
import { formAtom } from '../../routes/atoms';
import type { Brain, Content } from '@plone/types';
import RecurrenceWidgetModal from './Components/RecurrenceWidgetModal';

interface RecurrenceWidgetProps {
  label?: string;
}

const SubFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end">
      <div className="basis-4/5">{children}</div>
    </div>
  );
};

export function RecurrenceWidget({ label, ...props }: RecurrenceWidgetProps) {
  return (
    <Group className="group mb-4 flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <DialogTrigger>
        <Button className="h-9 w-9 hover:cursor-pointer">
          <EditIcon
            className="fill-quanta-cobalt color-quanta-cobalt"
            style={{ fill: 'fill-quanta-cobalt' }}
          />
        </Button>
        <RecurrenceWidgetModal />
      </DialogTrigger>
    </Group>
  );
}
