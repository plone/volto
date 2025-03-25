import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { parseDateTime, toBackendLang } from '@plone/volto/helpers/Utils/Utils';

import clearSVG from '@plone/volto/icons/clear.svg';

import 'react-time-picker/dist/TimePicker.css';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import { TimePicker } from 'react-time-picker';

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

const defaultTimeDateOnly = {
  hour: 12,
  minute: 0,
  second: 0,
};

const DatetimeWidgetComponent = (props) => {
  const { id, resettable, value, onChange, dateOnly, widget, isDisabled } =
    props;

  const intl = useIntl();
  const lang = intl.locale;

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const parsed = parseDateTime(toBackendLang(lang), value);
    setSelectedDate(parsed);
    const now = new Date().toISOString();
    setIsDefault(parsed?.toISOString() === now);
  }, [value, lang]);

  const getDateOnly = () => dateOnly || widget === 'date';

  const handleDateChange = (date) => {
    if (!date) return;
    const isDateOnly = getDateOnly();
    const base = selectedDate || new Date();
    const updated = new Date(base);
    updated.setFullYear(date.getFullYear());
    updated.setMonth(date.getMonth());
    updated.setDate(date.getDate());

    if (isDateOnly) {
      updated.setHours(defaultTimeDateOnly.hour);
      updated.setMinutes(defaultTimeDateOnly.minute);
      updated.setSeconds(defaultTimeDateOnly.second);
    }

    const newValue = isDateOnly
      ? updated.toISOString().split('T')[0]
      : updated.toISOString();

    setSelectedDate(updated);
    onChange(id, newValue);
    setIsDefault(false);
  };

  const handleTimeChange = (val) => {
    if (val) {
      const [h, m] = val.split(':').map(Number);
      const updated = new Date(selectedDate || new Date());
      updated.setHours(h);
      updated.setMinutes(m);
      updated.setSeconds(0);
      setSelectedDate(updated);
      onChange(id, updated.toISOString());
    }
  };

  const onResetDates = () => {
    setSelectedDate(null);
    setIsDefault(false);
    onChange(id, null);
  };

  const isDateOnly = getDateOnly();
  const timeValue = selectedDate
    ? `${String(selectedDate.getHours()).padStart(2, '0')}:${String(
        selectedDate.getMinutes(),
      ).padStart(2, '0')}`
    : '';

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', { 'default-date': isDefault })}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            disabled={isDisabled}
          />
        </div>

        {!isDateOnly && (
          <div
            className={cx('ui input time-input', { 'default-date': isDefault })}
          >
            <TimePicker
              disabled={isDisabled}
              value={timeValue}
              onChange={handleTimeChange}
              disableClock
              format="HH:mm"
              clearIcon={null}
              clockIcon={null}
              locale={toBackendLang(lang)}
              id={`${id}-time`}
              placeholder={intl.formatMessage(messages.time)}
            />
          </div>
        )}

        {resettable && (
          <button
            type="button"
            disabled={isDisabled || !selectedDate}
            onClick={onResetDates}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

DatetimeWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  dateOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  resettable: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  value: null,
  resettable: true,
  isDisabled: false,
};

export default DatetimeWidgetComponent;
