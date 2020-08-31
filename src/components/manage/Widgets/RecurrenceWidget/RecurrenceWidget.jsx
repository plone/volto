/**
 * RecurrenceWidget component.
 * @module components/manage/Widgets/RecurrenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import cx from 'classnames';
import { isEqual, map, find, concat, remove } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Form,
  Grid,
  Label,
  Button,
  Segment,
  Modal,
  Header,
} from 'semantic-ui-react';

import { SelectWidget, Icon, DatetimeWidget } from '@plone/volto/components';
import saveSVG from '@plone/volto/icons/save.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import {
  Days,
  OPTIONS,
  FREQUENCES,
  WEEKLY_DAYS,
  MONDAYFRIDAY_DAYS,
  toISOString,
  rrulei18n,
} from './Utils';

import IntervalField from './IntervalField';
import ByDayField from './ByDayField';
import EndField from './EndField';
import ByMonthField from './ByMonthField';
import ByYearField from './ByYearField';
import Occurences from './Occurences';

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

const NoRRuleOptions = [
  'recurrenceEnds',
  'monthly',
  'weekdayOfTheMonthIndex',
  'weekdayOfTheMonth',
  'yearly',
  'monthOfTheYear',
  'byhour',
  'byminute',
  'bysecond',
  'bynmonthday',
  'exdates',
  'rdates',
];
/**
 * RecurrenceWidget component class.
 * @function RecurrenceWidget
 * @returns {string} Markup of the component.
 */
class RecurrenceWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    formData: PropTypes.object,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    value: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props, intl) {
    super(props);
    moment.locale(this.props.intl.locale);

    let rruleSet = this.props.value
      ? rrulestr(props.value, {
          compatible: true, //If set to True, the parser will operate in RFC-compatible mode. Right now it means that unfold will be turned on, and if a DTSTART is found, it will be considered the first recurrence instance, as documented in the RFC.
          forceset: true,
          // dtstart: props.formData.start
          //   ? this.getUTCDate(props.formData.start)
          //       .startOf('day')
          //       .toDate()
          //   : null,
        })
      : new RRuleSet();

    this.state = {
      open: false,
      rruleSet: rruleSet,
      formValues: this.getFormValues(rruleSet),
      RRULE_LANGUAGE: rrulei18n(this.props.intl),
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.setRecurrenceStartEnd();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value) {
      if (prevProps.formData?.start !== this.props.formData?.start) {
        let start = this.getUTCDate(this.props.formData?.start)
          .startOf('day')
          .toDate();

        this.setState((prevState) => {
          let rruleSet = prevState.rruleSet;

          rruleSet = this.updateRruleSet(
            rruleSet,
            prevState.formValues,
            'dtstart',
            start,
          );

          return {
            ...prevState,
            rruleSet,
          };
        });
      }
    }
  }

  editRecurrence = () => {
    this.setRecurrenceStartEnd();
  };

  setRecurrenceStartEnd = () => {
    const start = this.props.formData?.start;

    let _start = this.getUTCDate(start).startOf('day').toDate();

    this.setState((prevState) => {
      let rruleSet = prevState.rruleSet;
      const formValues = this.getFormValues(rruleSet); //to set default values, included end

      rruleSet = this.updateRruleSet(rruleSet, formValues, 'dtstart', _start);
      return {
        ...prevState,
        rruleSet,
        formValues,
      };
    });
  };

  getUTCDate = (date) => {
    return date.match(/T(.)*(-|\+|Z)/g)
      ? moment(date).utc()
      : moment(`${date}Z`).utc();
  };

  show = (dimmer) => () => {
    this.setState({ dimmer, open: true });
    this.editRecurrence();
  };
  close = () => this.setState({ open: false });

  getFreq = (number, weekdays) => {
    let freq = FREQUENCES.DAILY;
    Object.entries(OPTIONS.frequences).forEach(([f, o]) => {
      if (o.rrule === number) {
        freq = f;
      }
    });
    if (freq === FREQUENCES.WEEKLY && weekdays) {
      if (isEqual(weekdays.sort(), WEEKLY_DAYS.map((w) => w.weekday).sort())) {
        freq = FREQUENCES.WEEKDAYS;
      }
    }
    return freq;
  };

  getWeekday = (number) => {
    var day = null;
    Object.keys(Days).forEach((d) => {
      if (Days[d].weekday === number) {
        day = Days[d];
      }
    });
    return day;
  };

  /**
   * Called on init, to populate form values
   * */
  getFormValues = (rruleSet) => {
    //default
    let formValues = {
      freq: FREQUENCES.DAILY,
      interval: 1,
    };

    formValues = this.changeField(
      formValues,
      'recurrenceEnds',
      this.props.formData?.end ? 'until' : 'count',
    );

    const rrule = rruleSet.rrules()[0];

    if (rrule) {
      var freq = this.getFreq(rrule.options.freq, rrule.options.byweekday);

      //init with rruleOptions
      Object.entries(rrule.options).forEach(([option, value]) => {
        switch (option) {
          case 'freq':
            formValues[option] = freq;
            break;
          case 'count':
            if (value != null) {
              formValues['recurrenceEnds'] = option;
              formValues[option] = value;
            }
            break;
          case 'until':
            if (value != null) {
              formValues['recurrenceEnds'] = option;
              formValues[option] = toISOString(value);
            }
            break;
          case 'byweekday':
            if (value && value.length > 0) {
              if (isEqual(value, WEEKLY_DAYS)) {
                formValues['freq'] = FREQUENCES.WEEKDAYS;
              }
              if (isEqual(value, MONDAYFRIDAY_DAYS)) {
                formValues['freq'] = FREQUENCES.MONDAYFRIDAY;
              }
            }
            formValues[option] = value
              ? value.map((d) => {
                  return this.getWeekday(d);
                })
              : [];
            break;
          case 'bymonthday':
            if (value && value.length > 0) {
              if (freq === FREQUENCES.MONTHLY) {
                formValues['monthly'] = option;
              }
              if (freq === FREQUENCES.YEARLY) {
                formValues['yearly'] = option;
              }
            } else {
              if (freq === FREQUENCES.MONTHLY) {
                formValues['monthly'] = null;
              }
              if (freq === FREQUENCES.YEARLY) {
                formValues['yearly'] = null;
              }
            }
            formValues[option] = value;
            break;
          case 'bynweekday':
            if (value && value.length > 0) {
              //[weekDayNumber,orinal_number] -> translated is for example: [sunday, third] -> the third sunday of the month

              if (freq === FREQUENCES.SMONTHLY) {
                formValues['monthly'] = 'byweekday';
              }
              if (freq === FREQUENCES.YEARLY) {
                formValues['yearly'] = 'byday';
              }
              formValues['weekdayOfTheMonth'] = value[0][0];
              formValues['weekdayOfTheMonthIndex'] = value[0][1];
            }
            break;
          case 'bymonth':
            if (freq === FREQUENCES.YEARLY) {
              formValues['yearly'] = 'byday';
            }
            formValues['monthOfTheYear'] = value ? value[0] : null;
            break;

          default:
            formValues[option] = value;
        }
      });
    }
    return formValues;
  };

  formValuesToRRuleOptions = (formValues) => {
    var values = Object.assign({}, formValues);

    //remove NoRRuleOptions
    NoRRuleOptions.forEach((opt) => {
      delete values[opt];
    });

    //transform values for rrule
    Object.keys(values).forEach((field) => {
      var value = values[field];
      switch (field) {
        case 'freq':
          if (value) {
            value = OPTIONS.frequences[value].rrule;
          }
          break;
        case 'until':
          value = value ? moment(new Date(value)).utc().toDate() : null;
          break;
        default:
          break;
      }

      if (value) {
        //set value
        values[field] = value;
      } else {
        //remove empty values
        delete values[field];
      }
    });

    return values;
  };

  updateRruleSet = (rruleSet, formValues, field, value) => {
    var rruleOptions = this.formValuesToRRuleOptions(formValues);
    var dstart =
      field === 'dtstart'
        ? value
        : rruleSet.dtstart()
        ? rruleSet.dtstart()
        : moment().utc().toDate();
    var exdates =
      field === 'exdates' ? value : Object.assign([], rruleSet.exdates());

    var rdates =
      field === 'rdates' ? value : Object.assign([], rruleSet.rdates());

    rruleOptions.dtstart = dstart;

    let set = new RRuleSet();
    //set.dtstart(dstart);
    set.rrule(new RRule(rruleOptions));

    exdates.map((ex) => set.exdate(ex));
    rdates.map((r) => set.rdate(r));

    return set;
  };

  getDefaultUntil = (freq) => {
    var end = this.props.formData?.end
      ? toISOString(this.getUTCDate(this.props.formData.end).toDate())
      : null;
    var tomorrow = toISOString(moment().add(1, 'days').utc().toDate());
    var nextWeek = toISOString(moment().add(7, 'days').utc().toDate());
    var nextMonth = toISOString(moment().add(1, 'months').utc().toDate());
    var nextYear = toISOString(moment().add(1, 'years').utc().toDate());

    var until = end;
    switch (freq) {
      case FREQUENCES.DAILY:
        until = end ? end : tomorrow;
        break;
      case FREQUENCES.WEEKLY:
        until = end ? end : nextWeek;
        break;
      case FREQUENCES.WEEKDAYS:
        until = end ? end : nextWeek;
        break;
      case FREQUENCES.MONDAYFRIDAY:
        until = end ? end : nextWeek;
        break;
      case FREQUENCES.MONTHLY:
        until = end ? end : nextMonth;
        break;
      case FREQUENCES.YEARLY:
        until = end ? end : nextYear;
        break;
      default:
        break;
    }

    return until;
  };

  changeField = (formValues, field, value) => {
    //  git p.log('field', field, 'value', value);
    //get weekday from state.
    var byweekday =
      this.state?.rruleSet?.rrules().length > 0
        ? this.state.rruleSet.rrules()[0].origOptions.byweekday
        : null;
    var currWeekday = this.getWeekday(moment().day() - 1);
    var currMonth = moment().month() + 1;

    var startMonth = this.props.formData?.start
      ? moment(this.props.formData.start).month() + 1
      : currMonth;
    var startWeekday = this.props.formData?.start
      ? this.getWeekday(moment(this.props.formData.start).day() - 1)
      : currWeekday;
    formValues[field] = value;

    const defaultMonthDay = this.props.formData?.start
      ? moment(this.props.formData.start).date()
      : moment().date();

    switch (field) {
      case 'freq':
        formValues.interval = 1;
        const fconfig = OPTIONS.frequences[value];

        //clear values
        if (!fconfig.interval) {
          formValues.interval = null;
        }

        formValues = this.changeField(formValues, 'byweekday', null);
        formValues = this.changeField(formValues, 'yearly', null);
        formValues = this.changeField(formValues, 'bymonthday', null);
        formValues = this.changeField(formValues, 'byweekday', null);
        formValues = this.changeField(formValues, 'monthOfTheYear', null);

        if (!formValues.until) {
          formValues.until = this.getDefaultUntil(value);
        }

        //set defaults
        switch (value) {
          case FREQUENCES.DAILY:
            break;
          case FREQUENCES.WEEKDAYS:
            formValues = this.changeField(formValues, 'byweekday', WEEKLY_DAYS);
            break;
          case FREQUENCES.MONDAYFRIDAY:
            formValues = this.changeField(
              formValues,
              'byweekday',
              MONDAYFRIDAY_DAYS,
            );
            break;
          case FREQUENCES.WEEKLY:
            formValues = this.changeField(formValues, 'byweekday', [
              startWeekday,
            ]);

            break;
          case FREQUENCES.MONTHLY:
            formValues = this.changeField(formValues, 'monthly', 'bymonthday');

            break;
          case FREQUENCES.YEARLY:
            formValues = this.changeField(formValues, 'yearly', 'bymonthday');
            break;
          default:
            break;
        }

        break;

      case 'recurrenceEnds':
        if (value === 'count') {
          formValues.count = 1;
          formValues.until = null;
        }
        if (value === 'until') {
          formValues.until = this.getDefaultUntil(formValues.freq);
          formValues.count = null; //default value
        }
        break;

      case 'byweekday':
        formValues.byweekday = value;

        if (FREQUENCES.WEEKLY !== formValues.freq) {
          formValues.weekdayOfTheMonth = value ? value[0].weekday : null;
          formValues.weekdayOfTheMonthIndex = value ? value[0].n : null;
        } else {
          delete formValues.weekdayOfTheMonth;
          delete formValues.weekdayOfTheMonthIndex;
        }

        break;
      case 'weekdayOfTheMonth':
        var weekday = this.getWeekday(value); // get new day
        var n = byweekday ? byweekday[0].n : 1;
        //set nth value
        formValues.byweekday = weekday ? [weekday.nth(n)] : null;
        break;
      case 'weekdayOfTheMonthIndex':
        var week_day = byweekday ? byweekday[0] : currWeekday; //get day from state. If not set get current day
        //set nth value
        formValues.byweekday = value ? [week_day.nth(value)] : null;
        break;

      case 'monthOfTheYear':
        if (value === null || value === undefined) {
          delete formValues.bymonth;
        } else {
          formValues.bymonth = [value];
        }
        break;

      case 'monthly':
        if (value === 'bymonthday') {
          formValues.bymonthday = [defaultMonthDay]; //default value
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        if (value === 'byweekday') {
          formValues.bymonthday = null; //default value
          formValues = this.changeField(formValues, 'byweekday', [
            currWeekday.nth(1),
          ]); //default value
        }
        if (value === null) {
          formValues = this.changeField(formValues, 'bymonthday', null); //default value
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        break;
      case 'yearly':
        if (value === 'bymonthday') {
          //sets bymonth and bymonthday in rruleset
          formValues.bymonthday = [defaultMonthDay]; //default value

          formValues = this.changeField(
            formValues,
            'monthOfTheYear',
            startMonth,
          ); //default value: current month
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        if (value === 'byday') {
          formValues = this.changeField(formValues, 'bymonthday', null); //default value
          formValues = this.changeField(formValues, 'byweekday', [
            startWeekday.nth(1),
          ]); //default value
          formValues = this.changeField(
            formValues,
            'monthOfTheYear',
            startMonth,
          ); //default value
        }
        break;
      default:
        break;
    }
    return formValues;
  };

  onChangeRule = (field, value) => {
    var formValues = Object.assign({}, this.state.formValues);
    formValues = this.changeField(formValues, field, value);

    this.setState((prevState) => {
      var rruleSet = prevState.rruleSet;
      rruleSet = this.updateRruleSet(rruleSet, formValues, field, value);
      return {
        ...prevState,
        rruleSet,
        formValues,
      };
    });
  };

  exclude = (date) => {
    let list = this.state.rruleSet.exdates().slice(0);
    list.push(date);
    this.onChangeRule('exdates', list);
  };

  undoExclude = (date) => {
    let list = this.state.rruleSet.exdates().slice(0);
    remove(list, (e) => {
      return e.getTime() === date.getTime();
    });
    this.onChangeRule('exdates', list);
  };

  addDate = (date) => {
    let all = concat(this.state.rruleSet.all(), this.state.rruleSet.exdates());

    var simpleDate = moment(new Date(date)).startOf('day').toDate().getTime();
    var exists = find(all, (e) => {
      var d = moment(e).startOf('day').toDate().getTime();
      return d === simpleDate;
    });
    if (!exists) {
      let list = this.state.rruleSet.rdates().slice(0);
      list.push(new Date(date));
      this.onChangeRule('rdates', list);
    }
  };

  save = () => {
    var value = this.state.rruleSet.toString();
    this.props.onChange(this.props.id, value);
    this.close();
  };

  remove = () => {
    this.props.onChange(this.props.id, null);
    let rruleSet = new RRuleSet();
    this.setState({
      rruleSet: rruleSet,
      formValues: this.getFormValues(rruleSet),
    });
  };

  render() {
    const { open, dimmer, rruleSet, formValues, RRULE_LANGUAGE } = this.state;

    const {
      id,
      title,
      required,
      description,
      error,
      fieldSet,
      intl,
    } = this.props;

    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={cx('recurrence-widget', description ? 'help' : '')}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              {rruleSet.rrules()[0] && (
                <>
                  <Label>
                    {rruleSet.rrules()[0]?.toText(
                      (t) => {
                        return RRULE_LANGUAGE.strings[t];
                      },
                      RRULE_LANGUAGE,
                      RRULE_LANGUAGE.dateFormatter,
                    )}
                  </Label>

                  <Segment>
                    <Occurences
                      rruleSet={rruleSet}
                      exclude={this.exclude}
                      undoExclude={this.undoExclude}
                      showTitle={false}
                      editOccurences={false}
                    />
                  </Segment>
                </>
              )}
              <div>
                <Button
                  basic
                  disabled={this.props.isDisabled}
                  color="blue"
                  className="edit-recurrence"
                  onClick={this.show('blurring')}
                  type="button"
                  aria-label={intl.formatMessage(messages.editRecurrence)}
                >
                  <Icon
                    name={editingSVG}
                    size="20px"
                    title={intl.formatMessage(messages.editRecurrence)}
                  />
                </Button>
                {this.props.value && (
                  <Button
                    basic
                    color="pink"
                    className="remove-recurrence"
                    onClick={() => {
                      this.remove();
                    }}
                    type="button"
                    aria-label={intl.formatMessage(messages.remove)}
                  >
                    <Icon
                      name={trashSVG}
                      size="20px"
                      title={intl.formatMessage(messages.remove)}
                    />
                  </Button>
                )}
              </div>
              <Modal
                dimmer={dimmer}
                open={open}
                onClose={this.close}
                className="recurrence-form"
                closeIcon
              >
                <Modal.Header>
                  {intl.formatMessage(messages.editRecurrence)}{' '}
                </Modal.Header>
                <Modal.Content scrolling>
                  {rruleSet.rrules().length > 0 && (
                    <Modal.Description>
                      <Segment>
                        <Form>
                          <SelectWidget
                            id="freq"
                            title={intl.formatMessage(messages.repeat)}
                            getVocabulary={() => {}}
                            getVocabularyTokenTitle={() => {}}
                            choices={Object.keys(OPTIONS.frequences).map(
                              (t) => {
                                return [t, intl.formatMessage(messages[t])];
                              },
                            )}
                            value={formValues.freq}
                            onChange={this.onChangeRule}
                          />
                          {OPTIONS.frequences[formValues.freq].interval && (
                            <IntervalField
                              label={intl.formatMessage(messages.repeatEvery)}
                              labelAfter={
                                formValues.freq &&
                                intl.formatMessage(
                                  messages['interval_' + formValues.freq],
                                )
                              }
                              value={formValues.interval}
                              onChange={this.onChangeRule}
                            />
                          )}

                          {/***** byday *****/}
                          {OPTIONS.frequences[formValues.freq].byday && (
                            <ByDayField
                              label={intl.formatMessage(messages.repeatOn)}
                              value={formValues.byweekday}
                              onChange={this.onChangeRule}
                            />
                          )}

                          {/***** bymonth *****/}
                          {OPTIONS.frequences[formValues.freq].bymonth && (
                            <ByMonthField
                              label={intl.formatMessage(messages.repeatOn)}
                              value={formValues.monthly}
                              bymonthday={formValues.bymonthday}
                              weekdayOfTheMonthIndex={
                                formValues.weekdayOfTheMonthIndex
                              }
                              weekdayOfTheMonth={formValues.weekdayOfTheMonth}
                              onChange={this.onChangeRule}
                            />
                          )}

                          {/***** byyear *****/}
                          {OPTIONS.frequences[formValues.freq].byyear && (
                            <ByYearField
                              label={intl.formatMessage(messages.repeatOn)}
                              value={formValues.yearly}
                              bymonthday={formValues.bymonthday}
                              monthOfTheYear={formValues.monthOfTheYear}
                              weekdayOfTheMonthIndex={
                                formValues.weekdayOfTheMonthIndex
                              }
                              weekdayOfTheMonth={formValues.weekdayOfTheMonth}
                              onChange={this.onChangeRule}
                            />
                          )}

                          {/*-- ends after N recurrence or date --*/}
                          <EndField
                            value={formValues.recurrenceEnds}
                            count={formValues.count}
                            until={formValues.until}
                            onChange={this.onChangeRule}
                          />
                        </Form>
                      </Segment>
                      <Segment>
                        <Occurences
                          rruleSet={rruleSet}
                          exclude={this.exclude}
                          undoExclude={this.undoExclude}
                        />
                      </Segment>
                      <Segment>
                        <Header as="h2">
                          {intl.formatMessage(messages.add_date)}
                        </Header>

                        <DatetimeWidget
                          id="addDate"
                          title={intl.formatMessage(
                            messages.select_date_to_add_to_recurrence,
                          )}
                          dateOnly={true}
                          noPastDates={true}
                          onChange={(id, value) => {
                            this.addDate(value === '' ? undefined : value);
                          }}
                        />
                      </Segment>
                    </Modal.Description>
                  )}
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    className="save"
                    basic
                    onClick={() => {
                      this.save();
                    }}
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
              {map(error, (message) => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    );
  }
}

export default injectIntl(RecurrenceWidget);
