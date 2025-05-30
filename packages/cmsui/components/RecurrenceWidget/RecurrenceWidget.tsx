import {
  DialogTrigger,
  FormValidationContext,
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
import { useTranslation } from 'react-i18next';
import { Form, Modal, Button, Dialog, SelectItem } from '@plone/components';
import { byMonthOptions, byYearOptions, FREQUENCES, OPTIONS } from './utils';
import { useAppForm } from '../Form/Form';
import { useStore } from '@tanstack/react-form';
import IntervalField from './Components/IntervalField';
import ByDayField from './Components/ByDayField';
import ByMonthDayField from './Components/ByMonthDayField';
import { FieldGroup } from '@plone/components/tailwind';
import ByWeekdayOfTheMonth from './Components/ByWeekdayOfTheMonth';
import ByWeekdayOfTheMonthIndex from './Components/ByWeekdayOfTheMonthIndex';
import RadioOptionsField from './Components/RadioOptionsField';
import MonthOfTheYearField from './Components/MonthOfTheYearField';

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
}

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
          className={'fixed top-0 flex h-screen w-full justify-center'}
        >
          <Modal
            isDismissable
            className={'bg-background w-[95%] md:w-[88%] lg:w-[850px]'}
          >
            <Dialog>
              <Heading slot="title">
                {t('cmsui.recurrence.editRecurrence')}
              </Heading>
              <form>
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
                      >
                        <Label>{t('cmsui.recurrence.repeat')}</Label>
                        <Button>
                          <SelectValue />
                        </Button>
                        <Popover className="bg-background">
                          <ListBox>
                            {Object.keys(OPTIONS.frequences).map(
                              (el, index) => (
                                <ListBoxItem
                                  key={el}
                                  value={OPTIONS.frequences[el]}
                                  id={el}
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
                            <ByMonthDayField onChange={field.handleChange} />
                          )}
                        />
                      );
                    } else if (
                      values.repeat === 'monthly' &&
                      values.monthly === 'byweekday'
                    )
                      return (
                        <FieldGroup>
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
                      );
                  }}
                />

                {OPTIONS.frequences[formValues.repeat]?.byyear && (
                  <form.AppField
                    name="yearly"
                    children={(field) => (
                      <RadioOptionsField
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
                        <FieldGroup>
                          <form.AppField
                            name="bymonthday"
                            children={(field) => (
                              <ByMonthDayField onChange={field.handleChange} />
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
                      );
                    } else if (
                      values.repeat === 'yearly' &&
                      values.yearly === 'byday'
                    )
                      return (
                        <FieldGroup>
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
                      );
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
