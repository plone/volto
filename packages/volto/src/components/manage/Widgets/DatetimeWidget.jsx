import PropTypes from 'prop-types';
import { DateTimePicker } from '@plone/components/quanta';
import { today, getLocalTimeZone } from '@internationalized/date';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

const DatetimeWidgetComponent = (props) => {
  const {
    id,
    resettable,
    value,
    onChange,
    dateOnly,
    widget,
    noPastDates: propNoPastDates,
    isDisabled,
    formData,
    widgetOptions,
  } = props;

  // If open_end is checked and this is the end field, don't render
  if (id === 'end' && formData?.open_end) {
    return null;
  }

  const isDateOnly =
    dateOnly ||
    widget === 'date' ||
    ((id === 'start' || id === 'end') && formData?.whole_day);

  const noPastDates =
    propNoPastDates || widgetOptions?.pattern_options?.noPastDates;

  const handleChange = (newValue) => {
    onChange(id, newValue);
  };

  // Normalize value: when switching from date-only back to datetime,
  // the value may be a plain date string (YYYY-MM-DD) which is invalid
  // for granularity="minute". Convert it to a full ISO datetime string.
  let normalizedValue = value;
  if (!isDateOnly && value && !value.includes('T')) {
    normalizedValue = `${value}T12:00:00Z`;
  }

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <DateTimePicker
          value={normalizedValue}
          onChange={handleChange}
          granularity={isDateOnly ? 'day' : 'minute'}
          isDisabled={isDisabled}
          resettable={resettable}
          {...(noPastDates ? { minValue: today(getLocalTimeZone()) } : {})}
        />
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
