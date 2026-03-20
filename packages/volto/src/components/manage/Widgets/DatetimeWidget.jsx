import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { parseDateTime, toBackendLang } from '@plone/volto/helpers/Utils/Utils';
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
  clearDateTime: {
    id: 'Clear date/time',
    defaultMessage: 'Clear date and time',
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

const DatetimeWidgetComponent = (props) => {
  const {
    id,
    resettable,
    reactDates,
    widgetOptions,
    moment,
    value,
    onChange,
    dateOnly,
    widget,
    noPastDates: propNoPastDates,
    isDisabled,
    formData,
    error,
    required,
  } = props;

  const intl = useIntl();
  const lang = intl.locale;

  // dateInputRef: only for aria-invalid (SingleDatePicker has no such prop)
  const dateInputRef = useRef(null);
  // timeInputRef: only for aria-required (rc-time-picker has no aria props)
  const timeInputRef = useRef(null);

  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const { SingleDatePicker } = reactDates;

  const renderWidget = !(id === 'end' && formData?.open_end);

  useEffect(() => {
    const parsedDateTime = parseDateTime(
      toBackendLang(lang),
      value,
      undefined,
      moment.default,
    );
    setIsDefault(
      parsedDateTime?.toISOString() === moment.default().utc().toISOString(),
    );
  }, [value, lang, moment]);

  const getInternalValue = () => {
    return parseDateTime(toBackendLang(lang), value, undefined, moment.default);
  };

  const getDateOnly = () => {
    return (
      dateOnly ||
      widget === 'date' ||
      ((id === 'start' || id === 'end') && formData?.whole_day)
    );
  };

  const onDateChange = (date) => {
    if (date) {
      const isDateOnly = getDateOnly();
      const base = (getInternalValue() || moment.default()).set({
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

  const onTimeChange = (time) => {
    if (time) {
      const base = (getInternalValue() || moment.default()).set({
        hours: time?.hours() ?? 0,
        minutes: time?.minutes() ?? 0,
        seconds: 0,
      });
      const dateValue = base.toISOString();
      onChange(id, dateValue);
    }
  };

  const onResetDates = () => {
    setIsDefault(false);
    onChange(id, null);
  };

  const onFocusChange = ({ focused }) => setFocused(focused);

  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;
  const datetime = getInternalValue();
  const isDateOnly = getDateOnly();

  // aria-invalid for the date input — SingleDatePicker has no such prop
  useEffect(() => {
    if (!renderWidget) return;
    const input = dateInputRef.current?.querySelector('input');
    if (!input) return;

    input.toggleAttribute('aria-invalid', error?.length > 0);
  }, [error, renderWidget]);

  // aria-required for the time input (rc-time-picker)
  useEffect(() => {
    if (!renderWidget || isDateOnly) return;
    const input = timeInputRef.current?.querySelector('input');
    if (!input) return;

    input.toggleAttribute('aria-required', !!required);
  }, [required, isDateOnly, renderWidget]);

  return (
    <FormFieldWrapper {...props}>
      {renderWidget && (
        <div className="date-time-widget-wrapper">
          <div
            ref={dateInputRef}
            className={cx('ui input date-input', {
              'default-date': isDefault,
            })}
          >
            <SingleDatePicker
              date={datetime}
              disabled={isDisabled}
              onDateChange={onDateChange}
              focused={focused}
              numberOfMonths={1}
              {...(noPastDates ? {} : { isOutsideRange: () => false })}
              onFocusChange={onFocusChange}
              noBorder
              required={required}
              displayFormat={moment.default
                .localeData(toBackendLang(lang))
                .longDateFormat('L')}
              navPrev={<PrevIcon />}
              navNext={<NextIcon />}
              id={`${id}-date`}
              placeholder={intl.formatMessage(messages.date)}
            />
          </div>
          {!isDateOnly && (
            <div
              ref={timeInputRef}
              className={cx('ui input time-input', {
                'default-date': isDefault,
              })}
            >
              <TimePicker
                disabled={isDisabled}
                defaultValue={datetime}
                value={datetime}
                onChange={onTimeChange}
                allowEmpty={false}
                showSecond={false}
                use12Hours={lang === 'en'}
                id={`${id}-time`}
                format={moment.default
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
              type="button"
              disabled={isDisabled || !datetime}
              onClick={onResetDates}
              className="item ui noborder button"
              aria-label={intl.formatMessage(messages.clearDateTime)}
            >
              <Icon name={clearSVG} size="24px" className="close" />
            </button>
          )}
        </div>
      )}
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
  noPastDates: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  resettable: PropTypes.bool,
};

DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default injectLazyLibs(['reactDates', 'moment'])(
  DatetimeWidgetComponent,
);
