/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Grid, Label } from 'semantic-ui-react';
import { map } from 'lodash';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import cx from 'classnames';
import leftKey from '../../../icons/left-key.svg';
import rightKey from '../../../icons/right-key.svg';
import { Icon } from '../../../components';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import 'rc-time-picker/assets/index.css';

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

    let datetime = moment().utc();

    if (this.props.value) {
      // check if datetime has timezone, otherwise assumes it's UTC
      datetime = this.props.value.match(/T(.)*(-|\+|Z)/g)
        ? moment(this.props.value).utc()
        : moment(`${this.props.value}Z`).utc();
    }

    if (!this.props.value && this.props.dateOnly) {
      datetime.set(defaultTimeDateOnly);
    }

    this.state = {
      focused: false,
      isDefault:
        datetime.toISOString() ===
        moment()
          .utc()
          .toISOString(),
      datetime,
    };
  }

  /**
   * Update date storage
   * @method onDateChange
   * @param {Object} date updated momentjs Object for date
   * @returns {undefined}
   */
  onDateChange = date => {
    if (date)
      this.setState(
        prevState => ({
          datetime: prevState.datetime.set({
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
  onTimeChange = time => {
    this.setState(
      prevState => ({
        datetime: prevState.datetime.set({
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
    this.props.onChange(this.props.id, this.state.datetime.toISOString());
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
      title,
      required,
      description,
      error,
      fieldSet,
      dateOnly,
      noPastDates,
      intl,
    } = this.props;
    const { datetime, isDefault, focused } = this.state;

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
              <div>
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
                    displayFormat={moment
                      .localeData(intl.locale)
                      .longDateFormat('L')}
                    navPrev={<PrevIcon />}
                    navNext={<NextIcon />}
                    id={`${id}-date`}
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
                      onChange={this.onTimeChange}
                      allowEmpty={false}
                      showSecond={false}
                      use12Hours={intl.locale === 'en'}
                      id={`${id}-time`}
                      format={moment
                        .localeData(intl.locale)
                        .longDateFormat('LT')}
                      focusOnOpen
                    />
                  </div>
                )}
              </div>
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
};

export default injectIntl(DatetimeWidget);
