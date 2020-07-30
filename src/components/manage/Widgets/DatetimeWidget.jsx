/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import { FormFieldWrapper, Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import cx from 'classnames';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { defineMessages, injectIntl } from 'react-intl';
import { settings } from '~/config';

const messages = defineMessages({
  date: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  time: {
    id: 'Time',
    defaultMessage: 'Time',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
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
    const timezone = settings.timezone || 'UTC';
    let datetime = null;

    if (this.props.value) {
      //  Since we set a default server timezone (UTC default), moment-timezone will transform
      //  datetime to that specific timezone
      datetime = moment.tz(this.props.value, timezone);
    }

    // @nzambello do we need this if using null by default?
    // if (!this.props.value && this.props.dateOnly) {
    //   datetime.set(defaultTimeDateOnly);
    // }

    this.state = {
      focused: false,
      isDefault: datetime?.toISOString() === moment().utc().toISOString(),
      datetime,
      timezone,
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
                ...(this.props.dateOnly ? defaultTimeDateOnly : {}),
              })
            : moment.tz(date.toISOString(), this.state.timezone).set({
                year: date.year(),
                month: date.month(),
                date: date.date(),
                ...(this.props.dateOnly ? defaultTimeDateOnly : {}),
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
          : moment.tz(time.toISOString(), this.state.timezone).set({
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
    // Serialize always to server default timezone (toISOString)
    this.props.onChange(this.props.id, this.state.datetime.toISOString(true));
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
    const {
      id,
      dateOnly,
      noPastDates,
      intl,
      isDraggable,
      isDisabled,
      onDelete,
      onEdit,
    } = this.props;
    const { datetime, isDefault, focused } = this.state;

    return (
      <FormFieldWrapper
        {...this.props}
        draggable={isDraggable}
        className="text"
        onEdit={onEdit ? () => onEdit(id) : null}
        onDelete={onDelete}
        intl={intl}
        isDisabled={isDisabled}
      >
        <div className="date-time-widget-wrapper">
          <div
            className={cx('ui input date-input', {
              'default-date': isDefault,
            })}
          >
            <SingleDatePicker
              date={datetime}
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
          {!dateOnly && (
            <div
              className={cx('ui input time-input', {
                'default-date': isDefault,
              })}
            >
              <TimePicker
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
          <button
            disabled={!datetime}
            onClick={() => this.onResetDates()}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
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
  isDraggable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
DatetimeWidget.defaultProps = {
  id: '',
  title: '',
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  isDraggable: false,
  isDisabled: false,
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
  wrapped: false,
};

export default injectIntl(DatetimeWidget);
