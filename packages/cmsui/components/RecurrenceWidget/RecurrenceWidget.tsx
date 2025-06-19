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
import EditIcon from '@plone/components/icons/edit.svg?react';
import CloseIcon from '@plone/components/icons/close.svg?react';
import ChevronDown from '@plone/components/icons/chevron-down.svg?react';
import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import {
  byMonthOptions,
  byYearOptions,
  OPTIONS,
  recurrenceEndOptions,
  widgetTailwindClasses,
} from './utils';
import { useAppForm } from '../Form/Form';
import { useStore } from '@tanstack/react-form';
import IntervalField from './Components/IntervalField';
import ByDayField from './Components/ByDayField';
import ByMonthDayField from './Components/ByMonthDayField';
import { Button, FieldGroup } from '@plone/components/tailwind';
import ByWeekdayOfTheMonth from './Components/ByWeekdayOfTheMonth';
import ByWeekdayOfTheMonthIndex from './Components/ByWeekdayOfTheMonthIndex';
import RadioOptionsField from './Components/RadioOptionsField';
import MonthOfTheYearField from './Components/MonthOfTheYearField';
import CountEndField from './Components/CountEndField';
import UntilEndField from './Components/UntilEndField';
import { twMerge } from 'tailwind-merge';

interface RecurrenceWidgetProps {
  label?: string;
}

export interface FormDefaultValues {
  repeat: string;
  interval: number;
  byweekday: string[];
  monthly: string;
  bymonthday: number;
  weekdayOfTheMonth: number;
  weekdayOfTheMonthIndex: number;
  yearly: string;
  monthOfTheYear: number;
  recurrenceEnd: string;
  count: number;
  until: string;
}

const SubFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end">
      <div className="basis-4/5">{children}</div>
    </div>
  );
};

export function RecurrenceWidget({ label, ...props }: RecurrenceWidgetProps) {
  const { t } = useTranslation();

  const defaultValues = useMemo(
    () =>
      ({
        repeat: '',
        interval: 0,
        byweekday: [],
        monthly: '',
        bymonthday: 0,
        weekdayOfTheMonth: -1,
        weekdayOfTheMonthIndex: 0,
        yearly: '',
        monthOfTheYear: 1,
        recurrenceEnd: '',
        count: 0,
        until: '',
      }) as FormDefaultValues,
    [],
  );

  const form = useAppForm({
    defaultValues,
  });

  const formValues = useStore(form.store, (state) => state.values);
  // console.log(formValues);
  // console.log(OPTIONS.frequences[formValues.repeat]);

  return (
    <Group className="group mb-4 flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <DialogTrigger>
        <Button className="hover:cursor-pointer">
          <EditIcon
            className="fill-quanta-cobalt color-quanta-cobalt"
            style={{ fill: 'bg-quanta-cobalt' }}
          />
        </Button>
        <ModalOverlay
          className={
            'bg-muted-background/80 fixed top-0 flex h-screen w-full items-center justify-center'
          }
        >
          <Modal
            isDismissable
            className={'bg-background relative w-[95%] md:w-[88%] lg:w-[850px]'}
          >
            <Dialog>
              <Heading
                slot="title"
                className="flex border-b-2 p-6 text-[20px] font-bold"
              >
                {t('cmsui.recurrence.editRecurrence')}
              </Heading>
              <Button slot="close" className="hover:cursor-pointer">
                <CloseIcon className="absolute top-6 right-6" />
              </Button>
              <form className="flex flex-col gap-4 px-6 py-2">
                {/* Sets type of recurrence: daily, monthly, etc */}
                <form.AppField
                  name="repeat"
                  children={(field) => (
                    <>
                      <Select
                        onSelectionChange={(value) =>
                          value &&
                          typeof value === 'string' &&
                          field.handleChange(value)
                        }
                        className={widgetTailwindClasses.fieldComponent}
                      >
                        <Label className={widgetTailwindClasses.labelComponent}>
                          {t('cmsui.recurrence.repeat')}
                        </Label>
                        <Button className={widgetTailwindClasses.selectButton}>
                          <SelectValue className="text-[1rem]" />
                          <ChevronDown />
                        </Button>
                        <Popover
                          className={widgetTailwindClasses.selectPopover}
                        >
                          <ListBox>
                            {Object.keys(OPTIONS.frequences).map(
                              (el, index) => (
                                <ListBoxItem
                                  key={el}
                                  value={OPTIONS.frequences[el]}
                                  id={el}
                                  className={widgetTailwindClasses.listBoxItem}
                                >
                                  {t(`cmsui.recurrence.options.${el}`)}
                                </ListBoxItem>
                              ),
                            )}
                          </ListBox>
                        </Popover>
                      </Select>
                    </>
                  )}
                />

                {/* Sets how often the recurrence repeats. */}
                {/*Eg. every x week, every y days, every z months */}
                {OPTIONS.frequences[formValues.repeat]?.interval && (
                  <form.AppField
                    name="interval"
                    children={(field) => (
                      <IntervalField
                        labelAfter={t(
                          `cmsui.recurrence.intervals.interval_${formValues.repeat}`,
                        )}
                        label={t('cmsui.recurrence.interval_label')}
                        onChange={field.handleChange}
                      />
                    )}
                  />
                )}

                {/* Only appears if recurrence is weekly */}
                {/* i.e. if repeat value is byday (weekday) */}
                {/*Eg. event repeats on each monday, each tuesday and thursday, etc. */}
                {OPTIONS.frequences[formValues.repeat]?.byday && (
                  <form.AppField
                    name="byweekday"
                    children={(field) => (
                      <ByDayField
                        onChange={field.handleChange}
                        label={t('cmsui.recurrence.repeaton_label')}
                      />
                    )}
                  />
                )}

                {OPTIONS.frequences[formValues.repeat]?.bymonth && (
                  <form.AppField
                    name="monthly"
                    children={(field) => (
                      <RadioOptionsField
                        label={t('cmsui.recurrence.repeaton_label')}
                        onChange={field.handleChange}
                        options={byMonthOptions(t)}
                        checkboxValue={formValues['monthly']}
                      />
                    )}
                  />
                )}

                <form.Subscribe
                  selector={(store) => store.values}
                  children={(values) => {
                    if (
                      values.repeat === 'monthly' &&
                      values.monthly === 'bymonthday'
                    ) {
                      return (
                        <form.AppField
                          name="bymonthday"
                          children={(field) => (
                            <SubFieldWrapper>
                              <ByMonthDayField onChange={field.handleChange} />
                            </SubFieldWrapper>
                          )}
                        />
                      );
                    } else if (
                      values.repeat === 'monthly' &&
                      values.monthly === 'byweekday'
                    )
                      return (
                        <SubFieldWrapper>
                          <FieldGroup
                            className={
                              widgetTailwindClasses.fieldGroupComponent
                            }
                          >
                            <div>The</div>
                            <form.AppField
                              name="weekdayOfTheMonthIndex"
                              children={(field) => (
                                <ByWeekdayOfTheMonthIndex
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                            <form.AppField
                              name="weekdayOfTheMonth"
                              children={(field) => (
                                <ByWeekdayOfTheMonth
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                          </FieldGroup>
                        </SubFieldWrapper>
                      );
                  }}
                />

                {OPTIONS.frequences[formValues.repeat]?.byyear && (
                  <form.AppField
                    name="yearly"
                    children={(field) => (
                      <RadioOptionsField
                        label={t('cmsui.recurrence.repeaton_label')}
                        onChange={field.handleChange}
                        options={byYearOptions(t)}
                        checkboxValue={formValues['yearly']}
                      />
                    )}
                  />
                )}

                <form.Subscribe
                  selector={(store) => store.values}
                  children={(values) => {
                    if (
                      values.repeat === 'yearly' &&
                      values.yearly === 'bymonthday'
                    ) {
                      return (
                        <SubFieldWrapper>
                          <FieldGroup
                            className={
                              widgetTailwindClasses.fieldGroupComponent
                            }
                          >
                            <form.AppField
                              name="bymonthday"
                              children={(field) => (
                                <ByMonthDayField
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                            <form.AppField
                              name="monthOfTheYear"
                              children={(field) => (
                                <MonthOfTheYearField
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                          </FieldGroup>
                        </SubFieldWrapper>
                      );
                    } else if (
                      values.repeat === 'yearly' &&
                      values.yearly === 'byday'
                    )
                      return (
                        <SubFieldWrapper>
                          <FieldGroup
                            className={
                              widgetTailwindClasses.fieldGroupComponent
                            }
                          >
                            <div>{t('cmsui.recurrence.on_the_label')}</div>
                            <form.AppField
                              name="weekdayOfTheMonthIndex"
                              children={(field) => (
                                <ByWeekdayOfTheMonthIndex
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                            <form.AppField
                              name="weekdayOfTheMonth"
                              children={(field) => (
                                <ByWeekdayOfTheMonth
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                            {t('cmsui.recurrence.ofmonth_label')}
                            <form.AppField
                              name="monthOfTheYear"
                              children={(field) => (
                                <MonthOfTheYearField
                                  onChange={field.handleChange}
                                />
                              )}
                            />
                          </FieldGroup>
                        </SubFieldWrapper>
                      );
                  }}
                />

                <form.AppField
                  name="recurrenceEnd"
                  children={(field) => (
                    <RadioOptionsField
                      label={t('cmsui.recurrence.ends_label')}
                      onChange={field.handleChange}
                      options={recurrenceEndOptions(t)}
                      checkboxValue={formValues['recurrenceEnd']}
                    />
                  )}
                />

                <form.Subscribe
                  selector={(store) => store.values.recurrenceEnd}
                  children={(recurrenceEnd) => {
                    if (recurrenceEnd === 'count') {
                      return (
                        <form.AppField
                          name="count"
                          children={(field) => (
                            <CountEndField onChange={field.handleChange} />
                          )}
                        />
                      );
                    } else if (recurrenceEnd === 'until') {
                      return (
                        <form.AppField
                          name="until"
                          children={(field) => (
                            <UntilEndField onChange={field.handleChange} />
                          )}
                        />
                      );
                    }
                  }}
                />
              </form>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </Group>
  );
}
