import { useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

import clearSVG from '@plone/volto/icons/clear.svg';

import { DatePicker, TimeField } from '@plone/components';
import '@plone/components/src/styles/basic/DatePicker.css';

import {
  parseZonedDateTime,
  getLocalTimeZone,
  today,
} from '@internationalized/date';

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

const DatetimeWidgetComponent = (props) => {
  const {
    id,
    resettable,
    widgetOptions,
    value,
    onChange,
    dateOnly,
    widget,
    noPastDates: propNoPastDates,
    isDisabled,
  } = props;

  const intl = useIntl();
  const [isDefault, setIsDefault] = useState(false);

  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;

  const timezone = getLocalTimeZone();

  const getDateOnly = () => dateOnly || widget === 'date';

  const parseDateValue = (val) => {
    try {
      return val ? parseZonedDateTime(val) : null;
    } catch {
      return null;
    }
  };

  const parsedValue = parseDateValue(value);

  const parseTimeValue = (val) => {
    if (!val) return null;
    const date = new Date(val);
    if (isNaN(date.getTime())) return null;

    return {
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    };
  };

  const timeValue = parseTimeValue(value);

  const handleTimeChange = (timeVal) => {
    if (!timeVal || !value) return;

    const date = new Date(value);
    date.setUTCHours(timeVal.hour ?? 0);
    date.setUTCMinutes(timeVal.minute ?? 0);
    date.setUTCSeconds(timeVal.second ?? 0);

    onChange(id, date.toISOString());
  };

  const handleDateChange = (newDateValue) => {
    if (!newDateValue) {
      onChange(id, null);
      return;
    }

    const jsDate = newDateValue.toDate();
    const iso = jsDate.toISOString();
    onChange(id, iso);
  };

  const onResetDates = () => {
    setIsDefault(false);
    onChange(id, null);
  };

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', {
            'default-date': isDefault,
          })}
        >
          <DatePicker
            label={intl.formatMessage(messages.date)}
            value={parsedValue}
            onChange={handleDateChange}
            minValue={noPastDates ? today(timezone) : undefined}
            isDisabled={isDisabled}
          />
        </div>
        {!getDateOnly() && (
          <div
            className={cx('ui input time-input', {
              'default-date': isDefault,
            })}
          >
            <TimeField
              label={intl.formatMessage(messages.time)}
              value={timeValue}
              onChange={handleTimeChange}
              isDisabled={isDisabled}
            />
          </div>
        )}
        {resettable && (
          <button
            type="button"
            disabled={isDisabled || !value}
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
  widgetOptions: PropTypes.object,
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
  widgetOptions: {},
};

export default DatetimeWidgetComponent;
