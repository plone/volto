/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import cx from 'classnames';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import 'rc-time-picker/assets/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const messages = defineMessages({
  date: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  time: {
    id: 'Time',
    defaultMessage: 'Time',
  },
});

const PrevIcon = () => (
  <div
    style={{
      color: '#000',
      left: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={leftKey} size="30px" />
  </div>
);
const NextIcon = () => (
  <div
    style={{
      color: '#000',
      right: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={rightKey} size="30px" />
  </div>
);

const defaultTimeDateOnly = {
  hour: 12,
  minute: 0,
  second: 0,
};

/**
 * DatetimeWidget component class
 * @class DatetimeWidget
 * @extends Component
 */
class DatetimeWidget extends Component {
  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs DatetimeWidget
   */
  constructor(props) {
    super(props);
    //  Used to set a server timezone or UTC as default
    moment.defineLocale(
      this.props.intl.locale,
      moment.localeData(this.props.intl.locale)._config,
    ); // copy locale to moment-timezone
    let datetime = null;

    if (this.props.value) {
      // check if datetime has timezone, otherwise assumes it's UTC
      datetime = this.props.value.match(/T(.)*(-|\+|Z)/g)
        ? // Since we assume UTC everywhere, then transform to local (momentjs default)
          moment(this.props.value)
        : // This might happen in old Plone versions dates
          moment(`${this.props.value}Z`);
    }

    this.state = {
      focused: false,
      isDefault: datetime?.toISOString() === moment().utc().toISOString(),
      datetime,
      dateOnly: this.props.dateOnly || this.props.widget === 'date',
    };
  }

  /**
   * Update date storage
   * @method onDateChange
   * @param {Object} date updated momentjs Object for date
   * @returns {undefined}
   */
  onDateChange = (date) => {
    if (date)
      this.setState(
        (prevState) => ({
          datetime: prevState.datetime
            ? prevState.datetime.set({
                year: date.year(),
                month: date.month(),
                date: date.date(),
                ...(this.state.dateOnly ? defaultTimeDateOnly : {}),
              })
            : moment().set({
                year: date.year(),
                month: date.month(),
                date: date.date(),
                ...(this.state.dateOnly ? defaultTimeDateOnly : {}),
              }),
          isDefault: false,
        }),
        () => this.onDateTimeChange(),
      );
  };

  /**
   * Update date storage
   * @method onTimeChange
   * @param {Object} time updated momentjs Object for time
   * @returns {undefined}
   */
  onTimeChange = (time) => {
    this.setState(
      (prevState) => ({
        datetime: prevState.datetime
          ? prevState.datetime.set({
              hours: time.hours(),
              minutes: time.minutes(),
              seconds: 0,
            })
          : moment().set({
              hours: time.hours(),
              minutes: time.minutes(),
              seconds: 0,
            }),
        isDefault: false,
      }),
      () => this.onDateTimeChange(),
    );
  };

  /**
   * Update date storage
   * @method onDateTimeChange
   * @returns {undefined}
   */
  onDateTimeChange = () => {
    const dateValue = this.state.dateOnly
      ? this.state.datetime.format('YYYY-MM-DD')
      : this.state.datetime.toISOString();
    this.props.onChange(this.props.id, dateValue);
  };

  onResetDates = () => {
    this.setState(
      (prevState) => ({
        datetime: null,
        isDefault: false,
      }),
      this.props.onChange(this.props.id, null),
    );
  };

  /**
   * Handle SingleDatePicker focus
   * @method onFocusChange
   * @param {boolean} focused component focus state.
   * @returns {undefined}
   */
  onFocusChange = ({ focused }) => this.setState({ focused });

  render() {
    const { id, noPastDates, resettable, intl } = this.props;
    const { datetime, isDefault, focused } = this.state;

    return (
      <FormFieldWrapper {...this.props}>
        <div className="date-time-widget-wrapper">
          <div
            className={cx('ui input date-input', {
              'default-date': isDefault,
            })}
          >
            <SingleDatePicker
              date={datetime}
              disabled={this.props.isDisabled}
              onDateChange={this.onDateChange}
              focused={focused}
              numberOfMonths={1}
              {...(noPastDates ? {} : { isOutsideRange: () => false })}
              onFocusChange={this.onFocusChange}
              noBorder
              displayFormat={moment.localeData(intl.locale).longDateFormat('L')}
              navPrev={<PrevIcon />}
              navNext={<NextIcon />}
              id={`${id}-date`}
              placeholder={intl.formatMessage(messages.date)}
            />
          </div>
          {!this.state.dateOnly && (
            <div
              className={cx('ui input time-input', {
                'default-date': isDefault,
              })}
            >
              <TimePicker
                disabled={this.props.isDisabled}
                defaultValue={datetime}
                value={datetime}
                onChange={this.onTimeChange}
                allowEmpty={false}
                showSecond={false}
                use12Hours={intl.locale === 'en'}
                id={`${id}-time`}
                format={moment.localeData(intl.locale).longDateFormat('LT')}
                placeholder={intl.formatMessage(messages.time)}
                focusOnOpen
                placement="bottomRight"
              />
            </div>
          )}
          {resettable && (
            <button
              disabled={this.props.isDisabled || !datetime}
              onClick={() => this.onResetDates()}
              className="item ui noborder button"
            >
              <Icon name={clearSVG} size="24px" className="close" />
            </button>
          )}
        </div>
      </FormFieldWrapper>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DatetimeWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  dateOnly: PropTypes.bool,
  noPastDates: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  resettable: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
DatetimeWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default injectIntl(DatetimeWidget);
