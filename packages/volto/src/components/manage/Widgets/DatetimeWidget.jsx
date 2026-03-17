import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Calendar, Popover } from '@plone/components';
import {
  DatePicker as RACDatePicker,
  DateInput,
  DateSegment,
  Group,
} from 'react-aria-components';
import {
  today,
  getLocalTimeZone,
  parseDate,
  parseAbsolute,
  ZonedDateTime,
} from '@internationalized/date';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

/**
 * Parse an ISO string value into a DateValue for react-aria DatePicker.
 * Handles both date-only ('YYYY-MM-DD') and full datetime (ISO 8601) strings.
 */
function parseValue(value, isDateOnly) {
  if (!value) return null;
  try {
    if (isDateOnly) {
      return parseDate(value.substring(0, 10));
    }
    const localTimeZone = getLocalTimeZone();
    const isoString =
      !value.match(/T/) || value.match(/T(.)*(-|\+|Z)/g) ? value : `${value}Z`;
    return parseAbsolute(isoString, localTimeZone);
  } catch (error) {
    return null;
  }
}

export const DatetimeWidgetComponent = (props) => {
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
    formData,
  } = props;

  const isDateOnly =
    dateOnly ||
    widget === 'date' ||
    ((id === 'start' || id === 'end') && formData?.whole_day);

  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;

  const dateValue = parseValue(value, isDateOnly);

  const handleChange = useCallback(
    (newValue) => {
      if (!newValue) {
        onChange(id, null);
        return;
      }
      if (newValue instanceof ZonedDateTime) {
        onChange(id, newValue.toAbsoluteString());
      } else {
        onChange(id, newValue.toString());
      }
    },
    [id, onChange],
  );

  const handleReset = useCallback(() => {
    onChange(id, null);
  }, [id, onChange]);

  // If open_end is checked and this is the end field, don't render
  if (id === 'end' && formData?.open_end) {
    return null;
  }

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <RACDatePicker
          value={dateValue}
          onChange={handleChange}
          granularity={isDateOnly ? 'day' : 'minute'}
          isDisabled={isDisabled}
          {...(noPastDates
            ? { minValue: today(getLocalTimeZone()) }
            : { isDateUnavailable: () => false })}
          aria-labelledby={`fieldset-${props.fieldSet}-field-label-${id}`}
        >
          <Group>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button>▼</Button>
          </Group>
          <Popover placement="bottom end">
            <Calendar />
          </Popover>
        </RACDatePicker>
        {resettable && dateValue && (
          <button
            type="button"
            disabled={isDisabled}
            onClick={handleReset}
            className="item ui noborder button"
          >
            ✕
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

export default DatetimeWidgetComponent;
