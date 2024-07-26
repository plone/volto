/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
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

const DatetimeWidget = (props) => {
  const {
    id,
    resettable,
    intl,
    reactDates,
    widgetOptions,
    lang,
    moment,
    value,
    onChange,
    dateOnly: propDateOnly,
    noPastDates: propNoPastDates,
    isDisabled,
  } = props;
  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const SingleDatePicker = reactDates.SingleDatePicker;

  useEffect(() => {
    const parsedDate = parseDateTime(
      toBackendLang(lang),
      value,
      undefined,
      moment.default,
    );
    setIsDefault(
      parsedDate?.toISOString() === moment.default().utc().toISOString(),
    );
  }, [value, lang, moment]);

  const getInternalValue = useCallback(() => {
    return parseDateTime(toBackendLang(lang), value, undefined, moment.default);
  }, [lang, value, moment]);

  const getDateOnly = useCallback(() => {
    return propDateOnly || props.widget === 'date';
  }, [propDateOnly, props.widget]);

  const handleDateChange = (date) => {
    if (date) {
      const momentInstance = moment.default;
      const isDateOnly = getDateOnly();
      const base = (getInternalValue() || momentInstance()).set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        ...(isDateOnly ? defaultTimeDateOnly : {}),
      });
      const dateValue = isDateOnly
        ? base.format('YYYY-MM-DD')
        : base.toISOString();
      onChange(id, dateValue);
    }
    setIsDefault(false);
  };

  const handleTimeChange = (time) => {
    const momentInstance = moment.default;
    if (time) {
      const base = (getInternalValue() || momentInstance()).set({
        hours: time?.hours() ?? 0,
        minutes: time?.minutes() ?? 0,
        seconds: 0,
      });
      const dateValue = base.toISOString();
      onChange(id, dateValue);
    }
  };

  const handleResetDates = () => {
    setIsDefault(false);
    onChange(id, null);
  };

  const handleFocusChange = ({ focused }) => setFocused(focused);

  const datetime = getInternalValue();
  const dateOnly = getDateOnly();
  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', { 'default-date': isDefault })}
        >
          <SingleDatePicker
            date={datetime}
            disabled={isDisabled}
            onDateChange={handleDateChange}
            focused={focused}
            numberOfMonths={1}
            {...(noPastDates ? {} : { isOutsideRange: () => false })}
            onFocusChange={handleFocusChange}
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
            className={cx('ui input time-input', { 'default-date': isDefault })}
          >
            <TimePicker
              disabled={isDisabled}
              defaultValue={datetime}
              value={datetime}
              onChange={handleTimeChange}
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
            // FF needs that the type is "button" in order to not POST the form
            type="button"
            disabled={isDisabled || !datetime}
            onClick={handleResetDates}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

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

DatetimeWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default injectLazyLibs(['reactDates', 'moment'])(
  connect((state) => ({
    lang: state.intl.locale,
  }))(injectIntl(DatetimeWidget)),
);
