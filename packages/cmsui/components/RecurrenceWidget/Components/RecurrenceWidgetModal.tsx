import { Button, FieldGroup, Label, Popover } from '@plone/components/quanta';
import {
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
  SelectValue,
  Select,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import CloseIcon from '@plone/components/icons/close.svg?react';
import CheckboxIcon from '@plone/components/icons/checkbox.svg?react';
import ChevronDown from '@plone/components/icons/chevron-down.svg?react';
import { useTranslation } from 'react-i18next';
// import { useAppForm } from '../../Form/Form';
import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { formAtom } from '../../../routes/atoms';
import {
  byMonthOptions,
  byYearOptions,
  Days,
  getWeekday,
  isFrequency,
  MONDAYFRIDAY_DAYS,
  OPTIONS,
  ORDINAL_NUMBERS,
  recurrenceEndOptions,
  WEEKLY_DAYS,
  widgetTailwindClasses,
  type Frequency,
  type MonthlyOption,
  type RecurrenceEndOption,
  type YearlyOption,
} from '../utils';
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from '@tanstack/react-form';
import { RRule, type Options, type WeekdayStr } from 'rrule';
import IntervalField from './IntervalField';
import ByDayField from './ByDayField';
import RadioOptionsField from './RadioOptionsField';
import ByMonthDayField from './ByMonthDayField';
import ByWeekdayOfTheMonthIndex from './ByWeekdayOfTheMonthIndex';
import MonthOfTheYearField from './MonthOfTheYearField';
import ByWeekdayOfTheMonth from './ByWeekdayOfTheMonth';
import CountEndField from './CountEndField';
import UntilEndField from './UntilEndField';
import SelectedDates from './SelectedDates';

interface RecurrenceWidgetModalProps {
  onSave: (rrule: string) => void;
  setIsModalOpen: (state: boolean) => void;
}

export interface FormDefaultValues {
  freq: Frequency;
  interval: number;
  byweekday: string[];
  monthly: MonthlyOption;
  bymonthday: number;
  weekdayOfTheMonth: number;
  weekdayOfTheMonthIndex: number;
  yearly: YearlyOption;
  monthOfTheYear: number;
  recurrenceEnd: RecurrenceEndOption;
  count: number;
  until: string;
  dtstart: string;
}

const SubFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-end">
      <div className="basis-4/5">{children}</div>
    </div>
  );
};

const RecurrenceWidgetModal = ({
  onSave,
  setIsModalOpen,
}: RecurrenceWidgetModalProps) => {
  const { t } = useTranslation();

  const eventFormContext = useAtomValue(formAtom);

  // @ts-ignore
  const startDate = new Date(eventFormContext.start);

  // @ts-ignore
  const defaultEndDate = new Date(eventFormContext.end);

  const defaultWeekday = startDate
    ? getWeekday(startDate.getDay() - 1)
    : getWeekday(new Date().getDay() - 1);

  const defaultMonthDay = startDate.getDate();

  const defaultMonthOfTheYear = startDate.getMonth();

  const defaultValues = useMemo(
    () =>
      ({
        freq: 'daily',
        interval: 1,
        byweekday: [],
        monthly: 'bymonthday',
        bymonthday: defaultMonthDay,
        weekdayOfTheMonth: 0,
        weekdayOfTheMonthIndex: 1,
        yearly: 'bymonthday',
        monthOfTheYear: defaultMonthOfTheYear,
        recurrenceEnd: 'until',
        count: 0,
        // @ts-ignore
        until: '',
        // @ts-ignore
        dtstart: eventFormContext?.start,
      }) as FormDefaultValues,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { fieldContext, formContext } = createFormHookContexts();

  const { useAppForm } = createFormHook({
    fieldComponents: {},
    formComponents: {},
    fieldContext,
    formContext,
  });

  const form = useAppForm({
    defaultValues,
  });

  const formValues = useStore(form.store, (state) => state.values);

  const resetForm = () => {
    form.reset();
  };

  useEffect(() => {
    // @ts-ignore
    if (!eventFormContext.recurrence) {
      form.reset(defaultValues);
    }
    // @ts-ignore
  }, [defaultValues, eventFormContext.recurrence, form]);

  const calculateWeekDay = () => {
    const weekday = getWeekday(formValues.weekdayOfTheMonth);

    const index =
      formValues.weekdayOfTheMonthIndex === 0
        ? 1
        : formValues.weekdayOfTheMonthIndex;

    return weekday ? [weekday.nth(index)] : null;
  };

  const formValuesToRRule = (formValues: FormDefaultValues) => {
    const updatedFormValues = {} as Options;

    updatedFormValues.dtstart = startDate;

    // 1. get frequency - field repeat
    const freq = OPTIONS.frequences[formValues.freq]?.rrule ?? 3;
    updatedFormValues.freq = freq;

    // 2. if no interval is involved, value will be 1
    if (!OPTIONS.frequences[formValues.freq]?.interval) {
      updatedFormValues.interval = 1;
    } else {
      const interval = formValues.interval;
      updatedFormValues.interval = interval;
    }

    // 3. calculate recurrence end
    if (formValues.recurrenceEnd === 'until') {
      const until =
        formValues.until === ''
          ? // @ts-ignore
            defaultEndDate
          : new Date(formValues.until);
      updatedFormValues.until = until;
      updatedFormValues.count = null;
    } else {
      const count = formValues.count;
      updatedFormValues.count = count;
    }

    // 4. if freq is weekly, calculate weekly values
    // - mondayfriday
    if (formValues.freq === 'mondayfriday') {
      // set monday and friday
      updatedFormValues.byweekday = MONDAYFRIDAY_DAYS;
    } else if (formValues.freq === 'weekdays') {
      // set days from monday to friday
      updatedFormValues.byweekday = WEEKLY_DAYS;
    } else if (formValues.freq === 'weekly') {
      // if no days are selected, set day of start date or current day

      const selectedWeekdays = formValues.byweekday as WeekdayStr[];

      // if days are selected, set those
      const rruleWeekdays =
        selectedWeekdays.length > 0
          ? selectedWeekdays.map((wd) => Days[wd]) // Days['MO'] → RRule.MO
          : defaultWeekday; // single fallback works as before

      updatedFormValues.byweekday = rruleWeekdays;
    }

    // 5. if freq is monthly calculate monthly values
    if (formValues.freq === 'monthly') {
      if (formValues.monthly === 'bymonthday') {
        updatedFormValues.bymonthday = formValues.bymonthday;
      } else {
        updatedFormValues.byweekday = calculateWeekDay();
      }
    }

    // 6. if freq is yearly, calculate yearly values
    if (formValues.freq === 'yearly') {
      if (formValues.yearly === 'bymonthday') {
        updatedFormValues.bymonth = formValues.monthOfTheYear;
        updatedFormValues.bymonthday = formValues.bymonthday;
      } else {
        updatedFormValues.byweekday = calculateWeekDay();
        updatedFormValues.bymonth = formValues.monthOfTheYear;
      }
    }

    return new RRule(updatedFormValues);
  };

  const rruleString = formValuesToRRule(formValues).toString();
  const rruleDates = formValuesToRRule(formValues).all();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(rruleString);
    setIsModalOpen(false);
  };

  return (
    <ModalOverlay
      className={
        'bg-muted-foreground/80 fixed top-0 flex h-screen w-full items-center justify-center'
      }
    >
      <Modal
        isDismissable
        className={
          'bg-background relative w-[95%] rounded-sm md:w-[88%] lg:w-[850px]'
        }
      >
        <Dialog>
          <div className="flex items-center justify-between border-b-2 p-6">
            <Heading slot="title" className="mb-0! flex text-[20px] font-bold">
              {t('cmsui.recurrence.editRecurrence')}
            </Heading>
            <Button
              slot="close"
              className="hover:cursor-pointer"
              onClick={(e) => setIsModalOpen(false)}
            >
              <CloseIcon className="" />
            </Button>
          </div>
          <div className="px-6 py-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Sets type of recurrence: daily, monthly, etc */}
              <div className="flex max-h-[65vh] flex-col gap-4 overflow-y-auto">
                <form.AppField
                  name="freq"
                  children={(field) => (
                    <>
                      <Select
                        onSelectionChange={(value) => {
                          if (formValues !== defaultValues) resetForm();
                          if (value && isFrequency(value))
                            field.handleChange(value);
                        }}
                        className={widgetTailwindClasses.fieldComponent}
                        defaultSelectedKey={Object.keys(
                          OPTIONS.frequences,
                        ).find((el) => el === formValues.freq)}
                      >
                        <Label className={widgetTailwindClasses.labelComponent}>
                          {t('cmsui.recurrence.repeat')}
                        </Label>
                        <Button className={widgetTailwindClasses.selectButton}>
                          <SelectValue
                            className="text-[1rem]"
                            defaultValue={formValues.freq}
                          />
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
                {OPTIONS.frequences[formValues.freq]?.interval && (
                  <form.AppField
                    name="interval"
                    children={(field) => (
                      <IntervalField
                        labelAfter={t(
                          `cmsui.recurrence.intervals.interval_${formValues.freq}`,
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
                {OPTIONS.frequences[formValues.freq]?.byday && (
                  <form.AppField
                    name="byweekday"
                    children={(field) => (
                      <ByDayField
                        onChange={field.handleChange}
                        label={t('cmsui.recurrence.repeaton_label')}
                        defaultValue={defaultWeekday?.toString() ?? ''}
                      />
                    )}
                  />
                )}

                {/* Only appears if recurrence is monthly */}
                {/* selection between:
                - by month day (e.g. day 22 of the month)
                - by week day (e.g. every third wednesday of the month) */}
                {OPTIONS.frequences[formValues.freq]?.bymonth && (
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
                    key={formValues.freq}
                  />
                )}

                <form.Subscribe
                  selector={(store) => store.values}
                  children={(values) => {
                    if (
                      values.freq === 'monthly' &&
                      values.monthly === 'bymonthday'
                    ) {
                      return (
                        <form.AppField
                          name="bymonthday"
                          children={(field) => (
                            <SubFieldWrapper>
                              <ByMonthDayField
                                onChange={field.handleChange}
                                defaultValue={defaultValues.bymonthday}
                              />
                            </SubFieldWrapper>
                          )}
                        />
                      );
                    } else if (
                      values.freq === 'monthly' &&
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
                                  defaultValue={
                                    defaultValues.weekdayOfTheMonthIndex as keyof typeof ORDINAL_NUMBERS
                                  }
                                />
                              )}
                            />
                            <form.AppField
                              name="weekdayOfTheMonth"
                              children={(field) => (
                                <ByWeekdayOfTheMonth
                                  onChange={field.handleChange}
                                  defaultValue={defaultValues.weekdayOfTheMonth}
                                />
                              )}
                            />
                          </FieldGroup>
                        </SubFieldWrapper>
                      );
                  }}
                />

                {/* Only appears if recurrence is yearly */}
                {/* selection between:
                - by month day (e.g. on january 3rd)
                - by week day (e.g. on first monday of january) */}
                {OPTIONS.frequences[formValues.freq]?.byyear && (
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
                      values.freq === 'yearly' &&
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
                                  defaultValue={defaultValues.bymonthday}
                                />
                              )}
                            />
                            <form.AppField
                              name="monthOfTheYear"
                              children={(field) => (
                                <MonthOfTheYearField
                                  onChange={field.handleChange}
                                  defaultValue={defaultValues.monthOfTheYear}
                                />
                              )}
                            />
                          </FieldGroup>
                        </SubFieldWrapper>
                      );
                    } else if (
                      values.freq === 'yearly' &&
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
                                  defaultValue={
                                    defaultValues.weekdayOfTheMonthIndex as keyof typeof ORDINAL_NUMBERS
                                  }
                                />
                              )}
                            />
                            <form.AppField
                              name="weekdayOfTheMonth"
                              children={(field) => (
                                <ByWeekdayOfTheMonth
                                  onChange={field.handleChange}
                                  defaultValue={defaultValues.weekdayOfTheMonth}
                                />
                              )}
                            />
                            {t('cmsui.recurrence.ofmonth_label')}
                            <form.AppField
                              name="monthOfTheYear"
                              children={(field) => (
                                <MonthOfTheYearField
                                  onChange={field.handleChange}
                                  defaultValue={defaultValues.monthOfTheYear}
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
                            <SubFieldWrapper>
                              <CountEndField onChange={field.handleChange} />
                            </SubFieldWrapper>
                          )}
                        />
                      );
                    } else if (recurrenceEnd === 'until') {
                      return (
                        <form.AppField
                          name="until"
                          children={(field) => (
                            <SubFieldWrapper>
                              <UntilEndField onChange={field.handleChange} />
                            </SubFieldWrapper>
                          )}
                        />
                      );
                    }
                  }}
                />
                <SelectedDates rruleDates={rruleDates} editMode />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-quanta-sapphire hover:bg-quanta-cobalt hover:cursor-pointer"
                  type="submit"
                >
                  <CheckboxIcon
                    className="fill-background color-background hover:fill-"
                    style={{ fill: 'bg-background' }}
                  />
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default RecurrenceWidgetModal;
