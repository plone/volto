/**
 * RecurrenceWidget component.
 * @module components/manage/Widgets/RecurrenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import { isEqual, find } from 'lodash';
import moment from 'moment';
import {
  Form,
  Grid,
  Input,
  Label,
  Button,
  Segment,
  Modal,
  Radio,
} from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import { SelectWidget } from '@plone/volto/components';
import Select from 'react-select';
import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

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
  recurrenceEnds: { id: 'Recurrence ends', defaultMessage: 'Ends' },
  recurrenceEndsCount: { id: 'Recurrence ends after', defaultMessage: 'after' },
  recurrenceEndsUntil: { id: 'Recurrence ends on', defaultMessage: 'on' },
  occurrences: { id: 'Occurences', defaultMessage: 'occurrence(s)' },

  weekday_MO: { id: 'Weekday MO', defaultMessage: 'MON' },
  weekday_TU: { id: 'Weekday TU', defaultMessage: 'TUE' },
  weekday_WE: { id: 'Weekday WE', defaultMessage: 'WEN' },
  weekday_TH: { id: 'Weekday TH', defaultMessage: 'THU' },
  weekday_FR: { id: 'Weekday FR', defaultMessage: 'FRI' },
  weekday_SA: { id: 'Weekday SA', defaultMessage: 'SAT' },
  weekday_SU: { id: 'Weekday SU', defaultMessage: 'SUN' },

  bymonthDay: { id: 'Month day', defaultMessage: 'Day' },
  ofTheMonth: { id: 'of the month', defaultMessage: 'of the month' },
  bymonthDayNumber: { id: 'Weeek day of month', defaultMessage: 'The' },
  first: { id: 'First', defaultMessage: 'First' },
  second: { id: 'Second', defaultMessage: 'Second' },
  third: { id: 'Third', defaultMessage: 'Third' },
  fourth: { id: 'Fourth', defaultMessage: 'Fourth' },
  last: { id: 'Last', defaultMessage: 'Last' },
});

const DAILY = 'daily';
const MONDAYFRIDAY = 'mondayfriday';
const WEEKDAYS = 'weekdays';
const WEEKLY = 'weekly';
const MONTHLY = 'monthly';
const YEARLY = 'yearly';

const ORDINAL_NUMBERS = {
  '1': 'first',
  '2': 'second',
  '3': 'third',
  '4': 'fourth',
  '-1': 'last',
};

const OPTIONS = {
  frequences: {
    [DAILY]: { rrule: RRule.DAILY, interval: true },
    [MONDAYFRIDAY]: { rrule: RRule.WEEKLY },
    [WEEKDAYS]: { rrule: RRule.WEEKLY },
    [WEEKLY]: { rrule: RRule.WEEKLY, interval: true, byday: true },
    [MONTHLY]: { rrule: RRule.MONTHLY, interval: true, bymonth: true },
    [YEARLY]: { rrule: RRule.YEARLY, interval: true, byyear: true },
  },
};

const Days = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
};

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
   * Default properties
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

    if (this.props.start) {
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

  toISOString = date => {
    return date.toISOString().split('T')[0];
  };

  getFreq = number => {
    let freq = DAILY;
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
      freq: DAILY,
    };
    const rrule = rruleSet.rrules()[0];
    if (rrule) {
      var freq = this.getFreq(rrule.options.freq);
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
              var weekly = [0, 1, 2, 3, 4];
              var mondayFriday = [0, 4];
              if (isEqual(value, weekly)) {
                formValues['freq'] = WEEKDAYS;
              }
              if (isEqual(value, mondayFriday)) {
                formValues['freq'] = MONDAYFRIDAY;
              }
            }
            formValues[option] = value ? value : [];
            break;
          case 'bymonthday':
            if (value && value.length > 0) {
              if (freq === MONTHLY) {
                formValues['monthly'] = option;
              }
              if (freq === YEARLY) {
                formValues['yearly'] = option;
              }
            }
            formValues[option] = value;
            break;
          case 'bynweekday':
            if (value && value.length > 0) {
              //[weekDayNumber,orinal_number] -> translated is for example: [sunday, third] -> the third sunday of the month

              if (freq === MONTHLY) {
                formValues['monthly'] = 'byweekday';
              }
              if (freq === YEARLY) {
                formValues['yearly'] = 'byday';
              }
              formValues['weekdayOfTheMonth'] = value[0][0];
              formValues['weekdayOfTheMonthIndex'] = value[0][1];
            }
            break;
          case 'bymonth':
            if (freq === YEARLY) {
              formValues['yearly'] = 'byday';
            }
            formValues['monthOfTheYear'] = value ? value[0] : value;
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

  changeField = (formValues, field, value) => {
    //get weekday from state.
    var byweekday = this.state.rruleSet.rrules()[0].origOptions.byweekday;

    switch (field) {
      case 'recurrenceEnds':
        if (value === 'count') {
          formValues.count = 1;
          formValues.until = null;
        }
        if (value === 'until') {
          var tomorrow = moment(new Date()).add(1, 'day');
          formValues.until = this.toISOString(tomorrow.toDate()); //default value
          formValues.count = null; //default value
        }
        break;
      case 'weekdayOfTheMonth':
        var weekday = this.getWeekday(value); // get new day
        var n = byweekday ? byweekday[0].n : 1;
        //set nth value
        formValues.byweekday = weekday ? [weekday.nth(n)] : null;
        break;
      case 'weekdayOfTheMonthIndex':
        var week_day = byweekday
          ? byweekday[0]
          : this.getWeekday(moment().day()); //get day from state. If not set get current day
        //set nth value
        formValues.byweekday = value ? [week_day.nth(value)] : null;
        break;
      case 'monthOfTheYear':
        formValues.bymonth = value;
        var d = this.state.rruleSet.rrules()[0].origOptions.byweekday;
        formValues.byweekday = d;
        break;
      default:
        break;
    }
    return formValues;
  };

  onChangeRule = (field, value) => {
    console.log('---onChangeRule: ', field, value);

    var formValues = Object.assign({}, this.state.formValues);

    switch (field) {
      case 'freq':
        formValues.interval = 1;
        const fconfig = OPTIONS.frequences[value];
        if (!fconfig.interval) {
          formValues.interval = null;
        }
        if (!fconfig.byday) {
          formValues.byweekday = null;
        } else if (!fconfig.bymonth) {
          formValues.monthly = null;
          formValues.bymonthday = null;
          formValues.byweekday = null;
          formValues.weekdayOfTheMonth = null;
          formValues.weekdayOfTheMonthIndex = null;
          formValues.monthOfTheYear = null;
        } else if (!fconfig.byyear) {
          formValues.yearly = null;
          formValues.bymonthday = null;
          formValues.byweekday = null;
          formValues.weekdayOfTheMonth = null;
          formValues.weekdayOfTheMonthIndex = null;
          formValues.monthOfTheYear = null;
        }

        break;
      case 'recurrenceEnds':
        formValues = this.changeField(formValues, field, value);
        break;
      case 'monthly':
        if (value === 'bymonthday') {
          formValues.bymonthday = [moment().date()]; //default value
          formValues.byweekday = null; //default value
        }
        if (value === 'byweekday') {
          formValues.bymonthday = null; //default value
          formValues.byweekday = [Days.MO.nth(1)]; //default value
        }
        break;
      case 'weekdayOfTheMonthIndex':
        formValues = this.changeField(formValues, field, value);
        break;
      case 'weekdayOfTheMonth':
        formValues = this.changeField(formValues, field, value);
        break;
      case 'yearly':
        if (value === 'bymonthday') {
          //sets bymonth and bymonthday in rruleset
          formValues.bymonthday = [moment().date()]; //default value
          formValues = this.changeField(formValues, 'monthOfTheYear', [
            moment().month() + 1,
          ]); //default value
          formValues = this.changeField(formValues, 'weekdayOfTheMonth', null); //default value
          formValues = this.changeField(
            formValues,
            'weekdayOfTheMonthIndex',
            null,
          ); //default value
        }
        if (value === 'byday') {
          formValues = this.changeField(formValues, 'bymonthday', null); //default value
          formValues = this.changeField(
            formValues,
            'weekdayOfTheMonth',
            moment().day(),
          ); //default value
          formValues = this.changeField(
            formValues,
            'weekdayOfTheMonthIndex',
            1,
          ); //default value
          formValues = this.changeField(formValues, 'monthOfTheYear', [
            moment().month() + 1,
          ]); //default value
        }
        break;

      case 'monthOfTheYear':
        formValues = this.changeField(formValues, field, value);
        break;
      default: //do nothing
    }

    formValues[field] = value;

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

  getDefaultSelectValue = (choices, value) => {
    const element = find(choices, o => o.value === value);
    return element ? element : {};
  };

  toggleWeekDay = dayName => {
    var day = Days[dayName];
    var byweekday = [...this.state.formValues.byweekday];

    var i = byweekday.indexOf(day.weekday);
    if (i >= 0) {
      byweekday.splice(i, 1);
    } else {
      byweekday.push(day.weekday);
    }
    this.onChangeRule('byweekday', byweekday);
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

    const inlineSelectStyles = {
      ...customSelectStyles,
      control: (styles, state) => ({
        ...customSelectStyles.control(styles, state),
        minWidth: '130px',
      }),
    };

    const weekdayOfTheMonthList = [
      ...map(Object.keys(Days), d => ({
        value: Days[d].weekday,
        label: intl.formatMessage(messages['weekday_' + d]),
      })),
    ];

    const weekdayOfTheMonthIndexList = [
      ...map(Object.keys(ORDINAL_NUMBERS), option => ({
        value: parseInt(option),
        label: intl.formatMessage(messages[ORDINAL_NUMBERS[option]]),
      })),
    ];
    const monthList = [
      ...map(moment.months(), (m, i) => ({
        value: i + 1,
        label: m,
      })),
    ];
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
                  {intl.formatMessage(messages.editRecurrence)}
                </Modal.Header>
                <Modal.Content scrolling>
                  <Modal.Description>
                    {rruleSet.rrules()[0].toString()}
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
                          <Form.Field inline className="text">
                            <Grid>
                              <Grid.Row stretched>
                                <Grid.Column width="4">
                                  <div className="wrapper">
                                    <label htmlFor="interval">
                                      {intl.formatMessage(messages.repeatEvery)}
                                    </label>
                                  </div>
                                </Grid.Column>
                                <Grid.Column width="8">
                                  <Form.Field inline>
                                    <Input
                                      id="interval"
                                      name="interval"
                                      value={formValues.interval || ''}
                                      onChange={({ target }) => {
                                        this.onChangeRule(
                                          target.id,
                                          target.value === ''
                                            ? undefined
                                            : target.value,
                                        );
                                      }}
                                    />
                                    {formValues.freq && (
                                      <span>
                                        {intl.formatMessage(
                                          messages[
                                            'interval_' + formValues.freq
                                          ],
                                        )}
                                      </span>
                                    )}
                                  </Form.Field>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        )}

                        {/***** byday *****/}
                        {OPTIONS.frequences[formValues.freq].byday && (
                          <Form.Field inline className="text">
                            <Grid>
                              <Grid.Row stretched>
                                <Grid.Column width="4">
                                  <div className="wrapper">
                                    <label htmlFor="interval">
                                      {intl.formatMessage(messages.repeatOn)}
                                    </label>
                                  </div>
                                </Grid.Column>
                                <Grid.Column width="8">
                                  <Button.Group basic>
                                    {Object.keys(Days).map(d => (
                                      <Button
                                        key={d}
                                        active={
                                          formValues.byweekday.indexOf(
                                            Days[d].weekday,
                                          ) >= 0
                                        }
                                        type="button"
                                        content={intl.formatMessage(
                                          messages['weekday_' + d],
                                        )}
                                        onClick={() => {
                                          this.toggleWeekDay(d);
                                        }}
                                      />
                                    ))}
                                  </Button.Group>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        )}

                        {/***** bymonth *****/}
                        {OPTIONS.frequences[formValues.freq].bymonth && (
                          <Form.Field inline className="text">
                            <Grid>
                              <Grid.Row stretched>
                                <Grid.Column width="4">
                                  <div className="wrapper">
                                    <label htmlFor="interval">
                                      {intl.formatMessage(messages.repeatOn)}
                                    </label>
                                  </div>
                                </Grid.Column>
                                <Grid.Column width="8">
                                  <Form.Group inline>
                                    <Form.Field>
                                      <Radio
                                        label=""
                                        name="monthly"
                                        value="bymonthday"
                                        checked={
                                          formValues.monthly === 'bymonthday'
                                        }
                                        onChange={(e, { value }) =>
                                          this.onChangeRule('monthly', value)
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.monthly !== 'bymonthday'
                                      }
                                    >
                                      {intl.formatMessage(messages.bymonthDay)}
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.monthly !== 'bymonthday'
                                      }
                                    >
                                      <Input
                                        type="number"
                                        id="bymonthday"
                                        name="bymonthday"
                                        value={formValues.bymonthday || ''}
                                        onChange={({ target }) => {
                                          this.onChangeRule(
                                            target.id,
                                            target.value === ''
                                              ? undefined
                                              : target.value,
                                          );
                                        }}
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.monthly !== 'bymonthday'
                                      }
                                    >
                                      {intl.formatMessage(messages.ofTheMonth)}
                                    </Form.Field>
                                  </Form.Group>
                                  <Form.Group inline>
                                    <Form.Field>
                                      <Radio
                                        label=""
                                        name="monthly"
                                        value="byweekday"
                                        checked={
                                          formValues.monthly === 'byweekday'
                                        }
                                        onChange={(e, { value }) =>
                                          this.onChangeRule('monthly', value)
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={
                                        formValues.monthly !== 'byweekday'
                                      }
                                    >
                                      {intl.formatMessage(
                                        messages.bymonthDayNumber,
                                      )}
                                    </Form.Field>

                                    <Form.Field
                                      disabled={
                                        formValues.monthly !== 'byweekday'
                                      }
                                    >
                                      <Select
                                        id="weekdayOfTheMonthIndex"
                                        name="weekdayOfTheMonthIndex"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          weekdayOfTheMonthIndexList,
                                          formValues['weekdayOfTheMonthIndex'],
                                        )}
                                        options={weekdayOfTheMonthIndexList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'weekdayOfTheMonthIndex',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={
                                        formValues.monthly !== 'byweekday'
                                      }
                                    >
                                      <Select
                                        isDisabled={
                                          formValues.monthly !== 'byweekday'
                                        }
                                        id="weekdayOfTheMonth"
                                        name="weekdayOfTheMonth"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          weekdayOfTheMonthList,
                                          formValues['weekdayOfTheMonth'],
                                        )}
                                        options={weekdayOfTheMonthList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'weekdayOfTheMonth',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={
                                        formValues.monthly !== 'byweekday'
                                      }
                                    >
                                      {intl.formatMessage(messages.ofTheMonth)}
                                    </Form.Field>
                                  </Form.Group>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        )}

                        {/***** byyear *****/}
                        {OPTIONS.frequences[formValues.freq].byyear && (
                          <Form.Field inline className="text">
                            <Grid>
                              <Grid.Row stretched>
                                <Grid.Column width="4">
                                  <div className="wrapper">
                                    <label htmlFor="interval">
                                      {intl.formatMessage(messages.repeatOn)}
                                    </label>
                                  </div>
                                </Grid.Column>
                                <Grid.Column width="8">
                                  <Form.Group inline>
                                    <Form.Field>
                                      <Radio
                                        label=""
                                        name="yearly"
                                        value="bymonthday"
                                        checked={
                                          formValues.yearly === 'bymonthday'
                                        }
                                        onChange={(e, { value }) =>
                                          this.onChangeRule('yearly', value)
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.yearly !== 'bymonthday'
                                      }
                                    >
                                      {intl.formatMessage(messages.bymonthDay)}
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.yearly !== 'bymonthday'
                                      }
                                    >
                                      <Input
                                        type="number"
                                        id="bymonthday"
                                        name="bymonthday"
                                        value={formValues.bymonthday || ''}
                                        onChange={({ target }) => {
                                          this.onChangeRule(
                                            target.id,
                                            target.value === ''
                                              ? undefined
                                              : target.value,
                                          );
                                        }}
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      inline
                                      disabled={
                                        formValues.yearly !== 'bymonthday'
                                      }
                                    >
                                      <Select
                                        isDisabled={
                                          formValues.yearly !== 'bymonthday'
                                        }
                                        id="monthOfTheYear"
                                        name="monthOfTheYear"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          monthList,
                                          formValues['monthOfTheYear'],
                                        )}
                                        value={this.getDefaultSelectValue(
                                          monthList,
                                          formValues['monthOfTheYear'],
                                        )}
                                        options={monthList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'monthOfTheYear',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                  </Form.Group>
                                  <Form.Group inline>
                                    <Form.Field>
                                      <Radio
                                        label=""
                                        name="yearly"
                                        value="byday"
                                        checked={formValues.yearly === 'byday'}
                                        onChange={(e, { value }) =>
                                          this.onChangeRule('yearly', value)
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={formValues.yearly !== 'byday'}
                                    >
                                      {intl.formatMessage(
                                        messages.bymonthDayNumber,
                                      )}
                                    </Form.Field>

                                    <Form.Field
                                      disabled={formValues.yearly !== 'byday'}
                                    >
                                      <Select
                                        id="weekdayOfTheMonthIndex"
                                        name="weekdayOfTheMonthIndex"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          weekdayOfTheMonthIndexList,
                                          formValues['weekdayOfTheMonthIndex'],
                                        )}
                                        options={weekdayOfTheMonthIndexList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'weekdayOfTheMonthIndex',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={formValues.yearly !== 'byday'}
                                    >
                                      <Select
                                        isDisabled={
                                          formValues.yearly !== 'byday'
                                        }
                                        id="weekdayOfTheMonth"
                                        name="weekdayOfTheMonth"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          weekdayOfTheMonthList,
                                          formValues['weekdayOfTheMonth'],
                                        )}
                                        value={this.getDefaultSelectValue(
                                          weekdayOfTheMonthList,
                                          formValues['weekdayOfTheMonth'],
                                        )}
                                        options={weekdayOfTheMonthList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'weekdayOfTheMonth',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                    <Form.Field
                                      disabled={formValues.yearly !== 'byday'}
                                    >
                                      {intl.formatMessage(messages.ofTheMonth)}
                                    </Form.Field>
                                    <Form.Field
                                      disabled={formValues.yearly !== 'byday'}
                                    >
                                      <Select
                                        isDisabled={
                                          formValues.yearly !== 'byday'
                                        }
                                        id="monthOfTheYear"
                                        name="monthOfTheYear"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        defaultValue={this.getDefaultSelectValue(
                                          monthList,
                                          formValues['monthOfTheYear'],
                                        )}
                                        value={this.getDefaultSelectValue(
                                          monthList,
                                          formValues['monthOfTheYear'],
                                        )}
                                        options={monthList}
                                        styles={inlineSelectStyles}
                                        theme={selectTheme}
                                        components={{
                                          DropdownIndicator,
                                          Option,
                                        }}
                                        onChange={data =>
                                          this.onChangeRule(
                                            'monthOfTheYear',
                                            data.value,
                                          )
                                        }
                                      />
                                    </Form.Field>
                                  </Form.Group>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        )}

                        {/*-- ends after N recurrence or date --*/}
                        <Form.Field inline className="text">
                          <Grid>
                            <Grid.Row stretched>
                              <Grid.Column width="4">
                                <div className="wrapper">
                                  <label htmlFor="recurrenceEnds">
                                    {intl.formatMessage(
                                      messages.recurrenceEnds,
                                    )}
                                  </label>
                                </div>
                              </Grid.Column>
                              <Grid.Column width="8">
                                <Form.Group inline>
                                  <Form.Field>
                                    <Radio
                                      label=""
                                      name="recurrenceEnds"
                                      value="count"
                                      checked={
                                        formValues.recurrenceEnds === 'count'
                                      }
                                      onChange={(e, { value }) =>
                                        this.onChangeRule(
                                          'recurrenceEnds',
                                          value,
                                        )
                                      }
                                    />
                                  </Form.Field>
                                  <Form.Field
                                    disabled={
                                      formValues.recurrenceEnds !== 'count'
                                    }
                                  >
                                    {intl.formatMessage(
                                      messages.recurrenceEndsCount,
                                    )}
                                  </Form.Field>
                                  <Form.Field
                                    disabled={
                                      formValues.recurrenceEnds !== 'count'
                                    }
                                  >
                                    <Input
                                      id="count"
                                      name="count"
                                      size="mini"
                                      value={formValues.count || ''}
                                      onChange={({ target }) => {
                                        this.onChangeRule(
                                          target.id,
                                          target.value === ''
                                            ? undefined
                                            : target.value,
                                        );
                                      }}
                                    />
                                  </Form.Field>
                                  <Form.Field
                                    disabled={
                                      formValues.recurrenceEnds !== 'count'
                                    }
                                  >
                                    {' '}
                                    {intl.formatMessage(messages.occurrences)}
                                  </Form.Field>
                                </Form.Group>
                                <Form.Group inline>
                                  <Form.Field>
                                    <Radio
                                      id="recurrenceEnds"
                                      label=""
                                      name="recurrenceEnds"
                                      value="until"
                                      checked={
                                        formValues.recurrenceEnds === 'until'
                                      }
                                      onChange={(e, { value }) =>
                                        this.onChangeRule(
                                          'recurrenceEnds',
                                          value,
                                        )
                                      }
                                    />
                                  </Form.Field>
                                  <Form.Field
                                    disabled={
                                      formValues.recurrenceEnds !== 'until'
                                    }
                                  >
                                    {intl.formatMessage(
                                      messages.recurrenceEndsUntil,
                                    )}
                                  </Form.Field>
                                  <Form.Field
                                    disabled={
                                      formValues.recurrenceEnds !== 'until'
                                    }
                                  >
                                    <Input
                                      id="until"
                                      type="date"
                                      name="until"
                                      value={formValues.until || ''}
                                      onChange={({ target }) => {
                                        this.onChangeRule(
                                          target.id,
                                          target.value === ''
                                            ? undefined
                                            : target.value,
                                        );
                                      }}
                                    />
                                  </Form.Field>
                                </Form.Group>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Form.Field>
                      </Form>
                    </Segment>
                    <Segment>
                      elenco ricorrenze selezionate con bottone per
                      disattivarle/attivarle
                      {rruleSet.all().map(date => {
                        return (
                          <div key={date.toString()}>{date.toString()}</div>
                        );
                      })}
                      {/* <List
      items={rrule
        .all()
        .map(date => datesForDisplay(date))
        .map(date => date.startDate)}
    /> */}
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
