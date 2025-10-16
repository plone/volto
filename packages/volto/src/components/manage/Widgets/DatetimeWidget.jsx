import React, { useState, useEffect } from 'react';
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
  } = props;

  const intl = useIntl();
  const lang = intl.locale;

  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const { SingleDatePicker } = reactDates;

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
    return dateOnly || widget === 'date';
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

  useEffect(() => {
    // Seletores para React Dates
    const selectors = [
      `#${id}-date`,
      `#${id}-date .DateInput_input`,
      `#${id}-date input`,
      `#${id}`,
      `.DateInput_input#${id}`,
    ];

    let dateInput = null;
    for (let selector of selectors) {
      const item = document.querySelector(selector);
      if (item && item.tagName === 'INPUT') {
        dateInput = item;
        break;
      }
      if (item && item.querySelector) {
        const inner = item.querySelector('input');
        if (inner) {
          dateInput = inner;
          break;
        }
      }
    }

    if (dateInput) {
      if (props.required) dateInput.setAttribute('aria-required', 'true');
      else dateInput.removeAttribute('aria-required');
    }
  }, [props.required, id]);

  useEffect(() => {
    // Selectors for the date field (react-dates)
    const dateSelectors = [
      `#${id}-date`,
      `#${id}-date .DateInput_input`,
      `#${id}-date input`,
      `#${id}`,
      `.DateInput_input#${id}`,
    ];

    // Selectors for the time field (rc-time-picker)
    const timeSelectors = [
      `#${id}-time input`,
      `#${id}-time .rc-time-picker-input`,
      `.rc-time-picker-input#${id}-time`,
      `.time-input #${id}-time`,
      `.time-input .rc-time-picker-input`,
    ];

    function findInput(selectors) {
      for (let selector of selectors) {
        const item = document.querySelector(selector);
        if (item && item.tagName === 'INPUT') return item;
        if (item && item.querySelector) {
          const inner = item.querySelector('input');
          if (inner) return inner;
        }
      }
      return null;
    }

    // Apply aria-required to the date input and, if required, also to the time input
    function applyAria() {
      const dateInput = findInput(dateSelectors);
      if (!dateInput) return;

      // Set or remove aria-required on the date input
      if (props.required) dateInput.setAttribute('aria-required', 'true');
      else dateInput.removeAttribute('aria-required');

      // If the date field is required, make the time field required as well
      if (props.required && !isDateOnly) {
        const timeInput = findInput(timeSelectors);
        if (timeInput) timeInput.setAttribute('aria-required', 'true');
      }
    }

    // Apply immediately
    applyAria();

    // Observe DOM changes since rc-time-picker and react-dates can recreate inputs
    const observer = new MutationObserver(() => applyAria());
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [props.required, id, isDateOnly]);

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
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
