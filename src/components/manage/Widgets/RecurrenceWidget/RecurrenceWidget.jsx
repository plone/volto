/**
 * RecurrenceWidget component.
 * @module components/manage/Widgets/RecurrenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import { isEqual, map } from 'lodash';

import moment from 'moment';
import { defineMessages, injectIntl } from 'react-intl';
import { Form, Grid, Label, Button, Segment, Modal } from 'semantic-ui-react';

import { SelectWidget } from '@plone/volto/components';

import {
  Days,
  OPTIONS,
  FREQUENCES,
  WEEKLY_DAYS,
  MONDAYFRIDAY_DAYS,
  toISOString,
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
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
  constructor(props) {
    super(props);

    let rruleSet = this.props.value
      ? rrulestr(props.value, { unfold: true, forceset: true })
      : new RRuleSet();

    console.log('constructor rruleSet', rruleSet);
    if (this.props.start) {
      console.log('set dtstart');
      var start = new Date(this.props.start);
      rruleSet = this.updateRruleSet(rruleSet, null, 'dtstart', start);
    }

    this.state = {
      open: false,
      rruleSet: rruleSet,
      formValues: this.getFormValues(rruleSet),
    };
    // console.log('all set', rruleSet.rrules()[0].all());
    // console.log('all rrule', rruleSet.rrules()[0].all());

    // console.log(props.value);
    // console.log(this.state.rruleSet);

    // console.log('to text:', this.state.rruleSet.toText());

    //console.log('rrule', rruleSet.rrules()[0]); //get rrule
    //console.log('exrule', rruleSet.exrules()[0]); //get exrulex
    //console.log('exdate', rruleSet.exdates()[0]); //get exrulex
    //rdates() //Get list of included datetimes in this recurrence set.
    //exdates() //Get list of excluded datetimes in this recurrence set.
    // console.log('count', r.rrules()[0].options.count);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  getFreq = number => {
    let freq = FREQUENCES.DAILY;
    Object.entries(OPTIONS.frequences).forEach(([f, o]) => {
      if (o.rrule === number) {
        freq = f;
      }
    });
    return freq;
  };

  getWeekday = number => {
    var day = null;
    Object.keys(Days).map(d => {
      if (Days[d].weekday === number) {
        day = Days[d];
      }
    });
    return day;
  };

  /**
   * Called on init, to populate form values
   * */
  getFormValues = rruleSet => {
    //default
    let formValues = {
      freq: FREQUENCES.DAILY,
    };
    const rrule = rruleSet.rrules()[0];
    if (rrule) {
      var freq = this.getFreq(rrule.options.freq);

      //init with rruleOptions
      Object.entries(rrule.options).forEach(([option, value]) => {
        switch (option) {
          case 'freq':
            formValues[option] = this.getFreq(value);
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
              formValues[option] = this.toISOString(value);
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
              ? value.map(d => {
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

    console.log('getFormValues elab', formValues);
    return formValues;
  };

  formValuesToRRuleOptions = formValues => {
    var values = Object.assign({}, formValues);

    //remove NoRRuleOptions
    NoRRuleOptions.map(opt => {
      delete values[opt];
    });

    //transform values for rrule
    Object.keys(values).map(field => {
      var value = values[field];
      switch (field) {
        case 'freq':
          if (value) {
            value = OPTIONS.frequences[value].rrule;
          }
          break;
        case 'until':
          value = value ? new Date(value) : null;
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
      field === 'dtstart' ? value : Object.assign({}, rruleSet.dtstart());
    var exdates =
      field === 'exdates' ? value : Object.assign({}, rruleSet.exdates());

    let set = new RRuleSet();
    console.log('updateRRuleset', formValues);
    set.rrule(new RRule(rruleOptions));
    set.dtstart(dstart);
    if (exdates) {
      for (var i = 0; i < exdates.length; i++) {
        set.exdate(exdates[i]);
      }
    }

    return set;
  };

  getDefaultUntil = freq => {
    var end = this.props.end ? new Date(this.props.end) : null;
    var tomorrow = this.toISOString(
      moment()
        .add(1, 'days')
        .utc()
        .toDate(),
    );
    var nextWeek = this.toISOString(
      moment()
        .add(7, 'days')
        .utc()
        .toDate(),
    );
    var nextMonth = this.toISOString(
      moment()
        .add(1, 'months')
        .utc()
        .toDate(),
    );
    var nextYear = this.toISOString(
      moment()
        .add(1, 'years')
        .utc()
        .toDate(),
    );

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
    console.log('field', field, 'value', value);
    //get weekday from state.
    var byweekday = this.state.rruleSet.rrules()[0].origOptions.byweekday;
    var currWeekday = this.getWeekday(moment().day() - 1);
    var currMonth = moment().month() + 1;

    formValues[field] = value;

    switch (field) {
      case 'freq':
        formValues.interval = 1;
        const fconfig = OPTIONS.frequences[value];

        //clear values
        if (!fconfig.interval) {
          formValues.interval = null;
        }
        if (!fconfig.byday) {
          formValues = this.changeField(formValues, 'byweekday', null);
        } else if (!fconfig.bymonth) {
          formValues = this.changeField(formValues, 'monthly', null);
          formValues = this.changeField(formValues, 'bymonthday', null);
          formValues = this.changeField(formValues, 'byweekday', null);
          formValues = this.changeField(formValues, 'monthOfTheYear', null);
        } else if (!fconfig.byyear) {
          formValues = this.changeField(formValues, 'yearly', null);
          formValues = this.changeField(formValues, 'bymonthday', null);
          formValues = this.changeField(formValues, 'byweekday', null);
          formValues = this.changeField(formValues, 'monthOfTheYear', null);
        }

        formValues.until = this.getDefaultUntil(value);

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
        formValues.bymonth = [value];
        // var d = this.state.rruleSet.rrules()[0].origOptions.byweekday;
        // formValues.byweekday = d;
        break;

      case 'monthly':
        if (value === 'bymonthday') {
          formValues.bymonthday = [moment().date()]; //default value
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        if (value === 'byweekday') {
          formValues.bymonthday = null; //default value
          formValues = this.changeField(formValues, 'byweekday', [
            currWeekday.nth(1),
          ]); //default value
        }
        if (value == null) {
          formValues = this.changeField(formValues, 'bymonthday', null); //default value
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        break;
      case 'yearly':
        if (value === 'bymonthday') {
          //sets bymonth and bymonthday in rruleset
          formValues.bymonthday = [moment().date()]; //default value
          formValues = this.changeField(
            formValues,
            'monthOfTheYear',
            currMonth,
          ); //default value: current month
          formValues = this.changeField(formValues, 'byweekday', null); //default value
        }
        if (value === 'byday') {
          formValues = this.changeField(formValues, 'bymonthday', null); //default value
          formValues = this.changeField(formValues, 'byweekday', [
            currWeekday.nth(1),
          ]); //default value
          formValues = this.changeField(
            formValues,
            'monthOfTheYear',
            currMonth,
          ); //default value
        }
        break;
      default:
        break;
    }
    return formValues;
  };

  onChangeRule = (field, value) => {
    console.log('---onChangeRule: ', field, value);

    var formValues = Object.assign({}, this.state.formValues);

    formValues = this.changeField(formValues, field, value);

    this.setState(
      prevState => {
        // console.log('prevState', prevState);
        var rruleSet = prevState.rruleSet;
        rruleSet = this.updateRruleSet(rruleSet, formValues);
        return {
          ...prevState,
          rruleSet,
          formValues,
        };
      },
      () => {
        // console.log(
        //   '---setState after',
        //   field,
        //   value,
        //   this.state.rruleSet.toString(),
        // );
      },
    );
  };

  exclude = date => {
    this.setState(
      prevState => {
        // console.log('prevState', prevState);
        var rruleSet = prevState.rruleSet;
        rruleSet.exdate(new Date(date));
        return {
          ...prevState,
          rruleSet,
        };
      },
      () => {
        console.log(this.state.rruleSet.all());
      },
    );
  };

  render() {
    const { open, dimmer, rruleSet, formValues } = this.state;

    const {
      id,
      title,
      required,
      description,
      error,
      value,
      fieldSet,
      intl,
    } = this.props;

    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
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
              -----da togliere alla fine ---
              {value}
              <br /> ---------
              <Button onClick={this.show('blurring')} type="button">
                {intl.formatMessage(messages.editRecurrence)}
              </Button>
              <Modal
                dimmer={dimmer}
                open={open}
                onClose={this.close}
                className="recurrence-form"
              >
                <Modal.Header>
                  {intl.formatMessage(messages.editRecurrence)}{' '}
                  {rruleSet.toString()}
                </Modal.Header>
                <Modal.Content scrolling>
                  <Modal.Description>
                    <Segment>
                      <Form>
                        <SelectWidget
                          id="freq"
                          title={intl.formatMessage(messages.repeat)}
                          getVocabulary={() => {}}
                          getVocabularyTokenTitle={() => {}}
                          choices={Object.keys(OPTIONS.frequences).map(t => {
                            return [t, intl.formatMessage(messages[t])];
                          })}
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
                      <Occurences rruleSet={rruleSet} exclude={this.exclude} />
                    </Segment>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button primary>Proceed</Button>
                </Modal.Actions>
              </Modal>
              {map(error, message => (
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
