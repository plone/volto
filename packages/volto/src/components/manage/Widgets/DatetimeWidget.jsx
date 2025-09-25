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
    value,
    onChange,
    dateOnly,
    widget,
    noPastDates: propNoPastDates,
    isDisabled,
  } = props;

  const intl = useIntl();
  const lang = intl.locale;
  const { SingleDatePicker } = reactDates;

  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const getInternalValue = () => {
    return parseDateTime(toBackendLang(lang), value);
  };

  useEffect(() => {
    const parsedDateTime = parseDateTime(toBackendLang(lang), value);
    const now = new Date().toISOString();
    setIsDefault(parsedDateTime?.toISOString() === now);
  }, [value, lang]);

  const getDateOnly = () => dateOnly || widget === 'date';

  const onDateChange = (momentDate) => {
    if (momentDate) {
      const date = momentDate.toDate();
      const isDateOnly = getDateOnly();
      const base = getInternalValue() || new Date();
      const updated = new Date(base);

      updated.setFullYear(date.getFullYear());
      updated.setMonth(date.getMonth());
      updated.setDate(date.getDate());

      if (isDateOnly) {
        updated.setHours(defaultTimeDateOnly.hour);
        updated.setMinutes(defaultTimeDateOnly.minute);
        updated.setSeconds(defaultTimeDateOnly.second);
      }

      const dateValue = isDateOnly
        ? updated.toISOString().split('T')[0]
        : updated.toISOString();

      onChange(id, dateValue);
    }
    setIsDefault(false);
  };

  const onTimeChange = (momentTime) => {
    if (momentTime) {
      const base = getInternalValue() || new Date();
      const updated = new Date(base);
      const date = momentTime.toDate();

      updated.setHours(date.getHours());
      updated.setMinutes(date.getMinutes());
      updated.setSeconds(0);

      const dateValue = updated.toISOString();
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

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', { 'default-date': isDefault })}
        >
          <SingleDatePicker
            date={datetime ? props.moment.default(datetime) : null}
            disabled={isDisabled}
            onDateChange={onDateChange}
            focused={focused}
            numberOfMonths={1}
            {...(noPastDates ? {} : { isOutsideRange: () => false })}
            onFocusChange={onFocusChange}
            noBorder
            displayFormat={() =>
              new Intl.DateTimeFormat(toBackendLang(lang), {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(datetime || new Date())
            }
            navPrev={<PrevIcon />}
            navNext={<NextIcon />}
            id={`${id}-date`}
            placeholder={intl.formatMessage(messages.date)}
          />
        </div>

        {!isDateOnly && (
          <div
            className={cx('ui input time-input', { 'default-date': isDefault })}
          >
            <TimePicker
              disabled={isDisabled}
              defaultValue={datetime ? props.moment.default(datetime) : null}
              value={datetime ? props.moment.default(datetime) : null}
              onChange={onTimeChange}
              allowEmpty={false}
              showSecond={false}
              use12Hours={lang === 'en'}
              id={`${id}-time`}
              format="HH:mm"
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
  isDisabled: PropTypes.bool,
};

DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
  isDisabled: false,
};

export default injectLazyLibs(['reactDates', 'moment'])(
  DatetimeWidgetComponent,
);
