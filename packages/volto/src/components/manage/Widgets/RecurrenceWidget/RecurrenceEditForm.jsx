import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form, Button, Segment, Modal, Header } from 'semantic-ui-react';
import { concat, find, filter } from 'lodash';
import moment from 'moment';
import { RRule, RRuleSet } from 'rrule';

import { SelectWidget, Icon, DatetimeWidget } from '@plone/volto/components';
import saveSVG from '@plone/volto/icons/save.svg';

import IntervalField from './IntervalField';
import ByDayField from './ByDayField';
import EndField from './EndField';
import ByMonthField from './ByMonthField';
import ByYearField from './ByYearField';
import Occurences from './Occurences';
import {
  OPTIONS,
  FREQUENCES,
  WEEKLY_DAYS,
  MONDAYFRIDAY_DAYS,
  toISOString,
  getUTCDate,
  getWeekday,
  getFreq,
} from './Utils';

const messages = defineMessages({
  editRecurrence: {
    id: 'Edit recurrence',
    defaultMessage: 'Edit recurrence',
  },
  save: {
    id: 'Save recurrence',
    defaultMessage: 'Save',
  },
  remove: {
    id: 'Remove recurrence',
    defaultMessage: 'Remove',
  },
  repeat: {
    id: 'Repeat',
    defaultMessage: 'Repeat',
  },
  daily: {
    id: 'Daily',
    defaultMessage: 'Daily',
  },
  mondayfriday: {
    id: 'Monday and Friday',
    defaultMessage: 'Monday and Friday',
  },

  weekdays: {
    id: 'Weekday',
    defaultMessage: 'Weekday',
  },
  weekly: {
    id: 'Weekly',
    defaultMessage: 'Weekly',
  },
  monthly: {
    id: 'Monthly',
    defaultMessage: 'Monthly',
  },
  yearly: {
    id: 'Yearly',
    defaultMessage: 'Yearly',
  },

  repeatEvery: {
    id: 'Repeat every',
    defaultMessage: 'Repeat every',
  },
  repeatOn: {
    id: 'Repeat on',
    defaultMessage: 'Repeat on',
  },

  interval_daily: {
    id: 'Interval Daily',
    defaultMessage: 'days',
  },
  interval_weekly: {
    id: 'Interval Weekly',
    defaultMessage: 'week(s)',
  },
  interval_monthly: {
    id: 'Interval Monthly',
    defaultMessage: 'Month(s)',
  },
  interval_yearly: {
    id: 'Interval Yearly',
    defaultMessage: 'year(s)',
  },
  add_date: {
    id: 'Add date',
    defaultMessage: 'Add date',
  },
  select_date_to_add_to_recurrence: {
    id: 'Select a date to add to recurrence',
    defaultMessage: 'Select a date to add to recurrence',
  },
});

function formValuesToRRuleOptions(formValues) {
  // rrule available options
  // freq, dtstart, interval, wkst, count, until, tzid, bymonth, bymonthday
  // byyearday, byweekno, byweekday, byhour, byminute, bysecond, byeaster

  const rruleOptions = {
    freq: OPTIONS.frequences[formValues.freq].rrule,
    interval: formValues.interval,
    until:
      formValues.recurrenceEnds === 'until'
        ? moment(new Date(formValues.until)).utc().toDate()
        : null,
    count: formValues.recurrenceEnds === 'count' ? formValues.count : null,
    dtstart: formValues.dtstart,
  };

  switch (formValues.freq) {
    case FREQUENCES.DAILY:
      break;

    case FREQUENCES.MONDAYFRIDAY:
      rruleOptions.byweekday = formValues.byweekday;
      break;

    case FREQUENCES.WEEKDAYS:
      rruleOptions.byweekday = formValues.byweekday;
      break;

    case FREQUENCES.WEEKLY:
      rruleOptions.byweekday = formValues.byweekday;
      break;

    case FREQUENCES.MONTHLY:
      if (formValues.monthly === 'byweekday') {
        const { weekdayOfTheMonth, weekdayOfTheMonthIndex } = formValues;
        const weekday = getWeekday(weekdayOfTheMonth);
        rruleOptions.byweekday = [weekday.nth(weekdayOfTheMonthIndex)];
      }

      if (formValues.monthly === 'bymonthday') {
        rruleOptions.bymonthday = formValues.bymonthday;
      }
      break;

    case FREQUENCES.YEARLY:
      if (formValues.yearly === 'bymonthday') {
        rruleOptions.bymonthday = formValues.bymonthday;
        rruleOptions.bymonth = [formValues.monthOfTheYear];
      }

      if (formValues.yearly === 'byday') {
        const { weekdayOfTheMonth, weekdayOfTheMonthIndex } = formValues;
        const weekday = getWeekday(weekdayOfTheMonth);
        const n = weekdayOfTheMonthIndex;

        rruleOptions.byweekday = [weekday.nth(n)];
        rruleOptions.bymonth = [formValues.monthOfTheYear];
      }
      break;

    default:
      break;
  }

  return rruleOptions;
}

function getEndDateFields(formValues) {
  return {
    recurrenceEnds: formValues.recurrenceEnds,
    until: formValues.until,
    count: formValues.count,
  };
}

function getDefaultUntil(formData, freq) {
  if (formData?.end) return toISOString(getUTCDate(formData.end).toDate());

  const tomorrow = toISOString(moment().add(1, 'days').utc().toDate());
  const nextWeek = toISOString(moment().add(7, 'days').utc().toDate());
  const nextMonth = toISOString(moment().add(1, 'months').utc().toDate());
  const nextYear = toISOString(moment().add(1, 'years').utc().toDate());

  let until = null;
  switch (freq) {
    case FREQUENCES.DAILY:
      until = tomorrow;
      break;
    case FREQUENCES.WEEKLY:
      until = nextWeek;
      break;
    case FREQUENCES.WEEKDAYS:
      until = nextWeek;
      break;
    case FREQUENCES.MONDAYFRIDAY:
      until = nextWeek;
      break;
    case FREQUENCES.MONTHLY:
      until = nextMonth;
      break;
    case FREQUENCES.YEARLY:
      until = nextYear;
      break;
    default:
      break;
  }

  return until;
}

const RecurrenceEditForm = (props) => {
  const { rruleSet, open, dimmer, onSave, onClose, formData } = props;
  const intl = useIntl();

  const [formValues, setFormValues] = useState(() => getFormValues(rruleSet));
  const [exdates, setExdates] = useState(() => rruleSet.exdates());
  const [rdates, setRdates] = useState(() => rruleSet.rdates());
  const currentRRuleSet = generateRRuleSet();

  function initializeDefaultForm() {
    return {
      dtstart: getUTCDate(formData.start).startOf('day').toDate(),
      ...getDefaultForm(FREQUENCES.DAILY),
      recurrenceEnds: formData.end ? 'until' : 'count',
      until: formData.end ? getDefaultUntil(formData, FREQUENCES.DAILY) : null,
      count: formData.end ? null : 1,
    };
  }

  function generateRRuleSet() {
    const rruleOptions = formValuesToRRuleOptions(formValues);
    const set = new RRuleSet();

    set.rrule(new RRule(rruleOptions));
    exdates.map((ex) => set.exdate(ex));
    rdates.map((r) => set.rdate(r));

    return set;
  }

  function getFormValues(rruleSet) {
    const rrule = rruleSet.rrules()[0];

    if (!rrule) {
      return initializeDefaultForm();
    }

    const freq = getFreq(rrule.options.freq, rrule.options.byweekday);

    const currFormValues = {
      freq,
      interval: rrule.options.interval,
      recurrenceEnds: rrule.options.until ? 'until' : 'count',
      until: toISOString(rrule.options.until),
      count: rrule.options.count,
      dtstart: new Date(rrule.options.dtstart),
    };

    switch (freq) {
      case FREQUENCES.DAILY:
        break;

      case FREQUENCES.MONDAYFRIDAY:
        currFormValues.byweekday = rrule.options.byweekday;
        break;

      case FREQUENCES.WEEKDAYS:
        currFormValues.byweekday = rrule.options.byweekday;
        break;

      case FREQUENCES.WEEKLY:
        currFormValues.byweekday = rrule.options.byweekday.map((weekday) =>
          getWeekday(weekday),
        );
        break;

      case FREQUENCES.MONTHLY:
        if (rrule.options.bymonthday?.length > 0) {
          currFormValues.monthly = 'bymonthday';
          currFormValues.bymonthday = rrule.options.bymonthday;
        }

        if (rrule.options.bynweekday?.length > 0) {
          currFormValues.monthly = 'byweekday';
          currFormValues.weekdayOfTheMonth = rrule.options.bynweekday[0][0];
          currFormValues.weekdayOfTheMonthIndex =
            rrule.options.bynweekday[0][1];
        }
        break;

      case FREQUENCES.YEARLY:
        if (rrule.options.bymonthday?.length > 0) {
          currFormValues.yearly = 'bymonthday';
          currFormValues.bymonthday = rrule.options.bymonthday;
          currFormValues.monthOfTheYear = rrule.options.bymonth[0];
        }

        if (rrule.options.bynweekday?.length > 0) {
          currFormValues.yearly = 'byday';
          currFormValues.weekdayOfTheMonth = rrule.options.bynweekday[0][0];
          currFormValues.weekdayOfTheMonthIndex =
            rrule.options.bynweekday[0][1];
          currFormValues.monthOfTheYear = rrule.options.bymonth[0];
        }
        break;

      default:
        break;
    }

    return currFormValues;
  }

  function getDefaultForm(freq) {
    const currWeekday = getWeekday(moment().day() - 1);

    const startWeekday = formData?.start
      ? getWeekday(moment(formData.start).day() - 1)
      : currWeekday;
    const defaultMonthDay = formData?.start
      ? moment(formData.start).date()
      : moment().date();

    const currMonth = moment().month() + 1;

    const startMonth = formData?.start
      ? moment(formData.start).month() + 1
      : currMonth;

    switch (freq) {
      case FREQUENCES.DAILY:
        return {
          freq,
          interval: 1,
        };
      case FREQUENCES.WEEKDAYS:
        return {
          freq,
          byweekday: WEEKLY_DAYS,
          interval: 1,
        };
      case FREQUENCES.MONDAYFRIDAY:
        return {
          freq,
          byweekday: MONDAYFRIDAY_DAYS,
          interval: 1,
        };
      case FREQUENCES.WEEKLY:
        return {
          freq,
          interval: 1,
          byweekday: [startWeekday],
        };
      case FREQUENCES.MONTHLY:
        return {
          freq,
          interval: 1,
          monthly: 'bymonthday',
          bymonthday: [defaultMonthDay],
          weekdayOfTheMonth: null,
          weekdayOfTheMonthIndex: null,
        };
      case FREQUENCES.YEARLY:
        return {
          freq,
          interval: 1,
          yearly: 'bymonthday',
          bymonthday: [defaultMonthDay],
          monthOfTheYear: startMonth,
          weekdayOfTheMonth: null,
          weekDayOfTheMonthIndex: null,
        };
      default:
        break;
    }
  }

  function onChangeField(field, value) {
    let newFormValues = { ...formValues };

    const currWeekday = getWeekday(moment().day() - 1);
    const currMonth = moment().month() + 1;

    const startMonth = formData?.start
      ? moment(formData.start).month() + 1
      : currMonth;

    const startWeekday = formData?.start
      ? getWeekday(moment(formData.start).day() - 1)
      : currWeekday;
    formValues[field] = value;

    const defaultMonthDay = formData?.start
      ? moment(formData.start).date()
      : moment().date();

    switch (field) {
      case 'freq': {
        newFormValues = {
          dtstart: formValues.dtstart,
          ...getDefaultForm(value),
          ...getEndDateFields(formValues),
        };
        break;
      }

      case 'recurrenceEnds':
        newFormValues.recurrenceEnds = value;
        if (value === 'count') {
          newFormValues.count = 1;
        }
        if (value === 'until') {
          newFormValues.until = getDefaultUntil(formData, formValues.freq);
          newFormValues.count = null;
        }
        break;

      case 'byweekday':
        if (FREQUENCES.WEEKLY === formValues.freq) {
          newFormValues.byweekday = value;
        } else {
          // for yearly and monthly
          newFormValues.weekdayOfTheMonth = value ? value[0].weekday : null;
          newFormValues.weekdayOfTheMonthIndex = value ? value[0].n : null;
        }

        break;

      case 'monthly':
        newFormValues.monthly = value;
        if (value === 'bymonthday') {
          newFormValues.bymonthday = [defaultMonthDay]; //default value
        }
        if (value === 'byweekday') {
          const defaultWeek = startWeekday.nth(1);
          newFormValues.bymonthday = null; //default value
          newFormValues.weekdayOfTheMonthIndex = defaultWeek.n;
          newFormValues.weekdayOfTheMonth = defaultWeek.weekday;
        }
        break;

      case 'yearly':
        newFormValues.yearly = value;
        if (value === 'bymonthday') {
          newFormValues.bymonthday = [defaultMonthDay]; //default value
          newFormValues.monthOfTheYear = startMonth;
        }
        if (value === 'byday') {
          const defaultWeek = startWeekday.nth(1);
          newFormValues.bymonthday = null;
          newFormValues.weekdayOfTheMonthIndex = defaultWeek.n;
          newFormValues.weekdayOfTheMonth = defaultWeek.weekday;
          newFormValues.monthOfTheYear = startMonth;
        }
        break;

      default: {
        newFormValues[field] = value;
        break;
      }
    }

    setFormValues(newFormValues);
  }

  function exclude(date) {
    setExdates([...exdates, date]);
  }

  function undoExclude(date) {
    const newExdates = filter(exdates, (e) => e.getTime() !== date.getTime());
    setExdates(newExdates);
  }

  function addDate(date) {
    const all = concat(currentRRuleSet.all(), currentRRuleSet.exdates());

    const simpleDate = moment(new Date(date)).startOf('day').toDate().getTime();
    const exists = find(all, (e) => {
      const d = moment(e).startOf('day').toDate().getTime();
      return d === simpleDate;
    });

    if (!exists) {
      setRdates([...rdates, new Date(date)]);
    }
  }

  return (
    <Modal
      dimmer={dimmer}
      open={open}
      onClose={onClose}
      className="recurrence-form"
      closeIcon
    >
      <Modal.Header>
        {intl.formatMessage(messages.editRecurrence)}{' '}
      </Modal.Header>

      <Modal.Content scrolling>
        <Modal.Description>
          <Segment>
            <Form>
              <SelectWidget
                id={'freq'}
                title={intl.formatMessage(messages.repeat)}
                getVocabulary={() => {}}
                getVocabularyTokenTitle={() => {}}
                choices={Object.keys(OPTIONS.frequences).map((t) => {
                  return [t, intl.formatMessage(messages[t])];
                })}
                value={formValues.freq}
                onChange={onChangeField}
              />

              {OPTIONS.frequences[formValues.freq].interval && (
                <IntervalField
                  label={intl.formatMessage(messages.repeatEvery)}
                  labelAfter={
                    formValues.freq &&
                    intl.formatMessage(messages['interval_' + formValues.freq])
                  }
                  value={formValues.interval}
                  onChange={onChangeField}
                />
              )}

              {/***** byday *****/}
              {OPTIONS.frequences[formValues.freq].byday && (
                <ByDayField
                  label={intl.formatMessage(messages.repeatOn)}
                  value={formValues.byweekday}
                  onChange={onChangeField}
                />
              )}

              {/***** bymonth *****/}
              {OPTIONS.frequences[formValues.freq].bymonth && (
                <ByMonthField
                  label={intl.formatMessage(messages.repeatOn)}
                  value={formValues.monthly}
                  bymonthday={formValues.bymonthday}
                  weekdayOfTheMonthIndex={formValues.weekdayOfTheMonthIndex}
                  weekdayOfTheMonth={formValues.weekdayOfTheMonth}
                  onChange={onChangeField}
                />
              )}

              {/***** byyear *****/}
              {OPTIONS.frequences[formValues.freq].byyear && (
                <ByYearField
                  label={intl.formatMessage(messages.repeatOn)}
                  value={formValues.yearly}
                  bymonthday={formValues.bymonthday}
                  monthOfTheYear={formValues.monthOfTheYear}
                  weekdayOfTheMonthIndex={formValues.weekdayOfTheMonthIndex}
                  weekdayOfTheMonth={formValues.weekdayOfTheMonth}
                  onChange={onChangeField}
                />
              )}

              {/*-- ends after N recurrence or date --*/}
              <EndField
                value={formValues.recurrenceEnds}
                count={formValues.count}
                until={formValues.until}
                onChange={onChangeField}
              />
            </Form>
          </Segment>

          <Segment>
            <Occurences
              rruleSet={currentRRuleSet}
              exclude={exclude}
              undoExclude={undoExclude}
            />
          </Segment>

          <Segment>
            <Header as="h2">{intl.formatMessage(messages.add_date)}</Header>

            <DatetimeWidget
              id="addDate"
              title={intl.formatMessage(
                messages.select_date_to_add_to_recurrence,
              )}
              dateOnly={true}
              noPastDates={true}
              onChange={(id, value) => {
                addDate(value === '' ? undefined : value);
              }}
            />
          </Segment>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          className="save"
          basic
          onClick={() => onSave(currentRRuleSet)}
          aria-label={intl.formatMessage(messages.save)}
        >
          <Icon
            name={saveSVG}
            className="circled"
            size="30px"
            title={intl.formatMessage(messages.save)}
          />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RecurrenceEditForm;
