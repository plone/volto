/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import cx from 'classnames';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import { parseDateTime, toBackendLang } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import 'rc-time-picker/assets/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const TimePicker = loadable(() => import('rc-time-picker'));

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
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Publish date",
 *  type: 'datetime',
 * }
 * ```
 */
export class DatetimeWidgetComponent extends Component {
  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs DatetimeWidget
   */
  constructor(props) {
    super(props);
    this.moment = props.moment.default;

    this.state = {
      focused: false,
      // if passed value matches the construction time, we guess it's a default
      isDefault:
        parseDateTime(
          toBackendLang(this.props.lang),
          this.props.value,
          undefined,
          this.moment,
        )?.toISOString() === this.moment().utc().toISOString(),
    };
  }

  getInternalValue() {
    return parseDateTime(
      toBackendLang(this.props.lang),
      this.props.value,
      undefined,
      this.moment,
    );
  }

  getDateOnly() {
    return this.props.dateOnly || this.props.widget === 'date';
  }

  /**
   * Update date storage
   * @method onDateChange
   * @param {Object} date updated momentjs Object for date
   * @returns {undefined}
   */
  onDateChange = (date) => {
    if (date) {
      const moment = this.props.moment.default;
      const isDateOnly = this.getDateOnly();
      const base = (this.getInternalValue() || moment()).set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        ...(isDateOnly ? defaultTimeDateOnly : {}),
      });
      const dateValue = isDateOnly
        ? base.format('YYYY-MM-DD')
        : base.toISOString();
      this.props.onChange(this.props.id, dateValue);
    }
    this.setState({ isDefault: false });
  };

  /**
   * Update date storage
   * @method onTimeChange
   * @param {Object} time updated momentjs Object for time
   * @returns {undefined}
   */
  onTimeChange = (time) => {
    const moment = this.props.moment.default;
    if (time) {
      const base = (this.getInternalValue() || moment()).set({
        hours: time?.hours() ?? 0,
        minutes: time?.minutes() ?? 0,
        seconds: 0,
      });
      const dateValue = base.toISOString();
      this.props.onChange(this.props.id, dateValue);
    }
  };

  onResetDates = () => {
    this.setState({ isDefault: false });
    this.props.onChange(this.props.id, null);
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
      resettable,
      intl,
      reactDates,
      widgetOptions,
      lang,
    } = this.props;
    const noPastDates =
      this.props.noPastDates || widgetOptions?.pattern_options?.noPastDates;
    const moment = this.props.moment.default;
    const datetime = this.getInternalValue();
    const dateOnly = this.getDateOnly();
    const { SingleDatePicker } = reactDates;

    return (
      <FormFieldWrapper {...this.props}>
        <div className="date-time-widget-wrapper">
          <div
            className={cx('ui input date-input', {
              'default-date': this.state.isDefault,
            })}
          >
            <SingleDatePicker
              date={datetime}
              disabled={this.props.isDisabled}
              onDateChange={this.onDateChange}
              focused={this.state.focused}
              numberOfMonths={1}
              {...(noPastDates ? {} : { isOutsideRange: () => false })}
              onFocusChange={this.onFocusChange}
              noBorder
              displayFormat={moment
                .localeData(toBackendLang(lang))
                .longDateFormat('L')}
              navPrev={<PrevIcon />}
              navNext={<NextIcon />}
              id={`${id}-date`}
              placeholder={intl.formatMessage(messages.date)}
            />
          </div>
          {!dateOnly && (
            <div
              className={cx('ui input time-input', {
                'default-date': this.state.isDefault,
              })}
            >
              <TimePicker
                disabled={this.props.isDisabled}
                defaultValue={datetime}
                value={datetime}
                onChange={this.onTimeChange}
                allowEmpty={false}
                showSecond={false}
                use12Hours={lang === 'en'}
                id={`${id}-time`}
                format={moment
                  .localeData(toBackendLang(lang))
                  .longDateFormat('LT')}
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
DatetimeWidgetComponent.propTypes = {
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
DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default compose(
  injectLazyLibs(['reactDates', 'moment']),
  connect((state) => ({
    lang: state.intl.locale,
  })),
  injectIntl,
)(DatetimeWidgetComponent);
