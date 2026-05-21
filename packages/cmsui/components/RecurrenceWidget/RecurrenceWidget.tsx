import { DialogTrigger, Group } from 'react-aria-components';

import { Label } from '../Field/Field';
import EditIcon from '@plone/components/icons/edit.svg?react';
import DeleteIcon from '@plone/components/icons/bin.svg?react';

import { Button } from '@plone/components/quanta';

import { lazy, Suspense, useMemo, useState } from 'react';

const RecurrenceWidgetModal = lazy(
  () => import('./Components/RecurrenceWidgetModal'),
);
import { useAtomValue } from 'jotai';
import { formAtom } from '../../routes/atoms';
import type { FieldProps } from '../Form/Field';

import { rrulestr } from './rrule';
import SelectedDates from './Components/SelectedDates';
import { getRruleText } from './utils';
import type { EventContent } from '@plone/types';

type RecurrenceWidgetProps = FieldProps;

export function RecurrenceWidget({ label, onChange }: RecurrenceWidgetProps) {
  const eventFormContext = useAtomValue(formAtom) as EventContent;

  // @ts-ignore
  const recurrence = eventFormContext?.recurrence ?? null;

  const rrule = recurrence ? rrulestr(recurrence) : null;
  const rruleText = getRruleText(rrule);

  const dates = useMemo(() => rrule?.all() ?? [], [rrule]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Group
      className={`
        group mb-4 flex flex-col gap-1
        hover:cursor-default
      `}
    >
      {label && <Label>{label}</Label>}
      <div className="flex">
        <DialogTrigger isOpen={isModalOpen}>
          <Button
            className={`
              h-9 w-9
              hover:cursor-pointer
              pressed:bg-quanta-air pressed:outline-quanta-cobalt
            `}
            onClick={(e) => setIsModalOpen(true)}
          >
            <EditIcon
              className="color-quanta-cobalt fill-quanta-cobalt"
              style={{ fill: 'fill-quanta-cobalt' }}
            />
          </Button>
          {isModalOpen && (
            <Suspense fallback={null}>
              <RecurrenceWidgetModal
                onSave={(rrule: string) => {
                  if (onChange) onChange(rrule);
                }}
                setIsModalOpen={setIsModalOpen}
              />
            </Suspense>
          )}
        </DialogTrigger>

        <Button
          className={`
            h-9 w-9
            hover:cursor-pointer
          `}
          onClick={(e) => {
            if (onChange) onChange(null);
          }}
        >
          <DeleteIcon className="color-quanta-candy fill-quanta-candy!" />
        </Button>
      </div>

      {recurrence && (
        <div className="mt-2">
          <div className="bg-muted-foreground/10 p-2 font-semibold text-muted-foreground">
            {rruleText && <div>{rruleText}</div>}
          </div>
          <div className="mt-2">
            {dates.length > 0 && <SelectedDates rruleDates={dates} />}
          </div>
        </div>
      )}
    </Group>
  );
}
