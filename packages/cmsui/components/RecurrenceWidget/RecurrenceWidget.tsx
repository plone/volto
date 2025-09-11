import { DialogTrigger, Group } from 'react-aria-components';

import { Label } from '../Field/Field';
import EditIcon from '@plone/components/icons/edit.svg?react';
import DeleteIcon from '@plone/components/icons/bin.svg?react';

import { Button } from '@plone/components/quanta';

import RecurrenceWidgetModal from './Components/RecurrenceWidgetModal';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { formAtom } from '../../routes/atoms';
import type { FieldProps } from '../Form/Field';
import { RRule, rrulestr } from 'rrule';
import SelectedDates from './Components/SelectedDates';

interface RecurrenceWidgetProps extends FieldProps {}

export function RecurrenceWidget({
  label,
  onChange,
  ...props
}: RecurrenceWidgetProps) {
  const eventFormContext = useAtomValue(formAtom);
  // @ts-ignore

  // @ts-ignore
  const recurrence = eventFormContext?.recurrence ?? null;

  const rrule = recurrence ? rrulestr(recurrence) : null;
  const rruleText = rrule && rrule.toText();
  const rruleDates = rrule && rrule.all();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Group className="group mb-4 flex flex-col gap-1 hover:cursor-default">
      {label && <Label>{label}</Label>}
      <div className="flex">
        <DialogTrigger isOpen={isModalOpen}>
          <Button
            className="pressed:bg-quanta-air pressed:outline-quanta-cobalt h-9 w-9 hover:cursor-pointer"
            onClick={(e) => setIsModalOpen(true)}
          >
            <EditIcon
              className="fill-quanta-cobalt color-quanta-cobalt"
              style={{ fill: 'fill-quanta-cobalt' }}
            />
          </Button>
          <RecurrenceWidgetModal
            onSave={(rrule: string) => {
              if (onChange) onChange(rrule);
            }}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogTrigger>

        <Button
          className="h-9 w-9 hover:cursor-pointer"
          onClick={(e) => {
            if (onChange) onChange(null);
          }}
        >
          <DeleteIcon
            className="fill-quanta-candy color-quanta-candy"
            style={{ fill: 'fill-quanta-candy' }}
          />
        </Button>
      </div>

      {recurrence && (
        <div className="mt-2">
          <div className="bg-muted-foreground/10 text-muted-foreground p-2 font-semibold">
            <div>{rruleText}</div>
          </div>
          <div className="mt-2">
            {rruleDates && <SelectedDates rruleDates={rruleDates} />}
          </div>
        </div>
      )}
    </Group>
  );
}
