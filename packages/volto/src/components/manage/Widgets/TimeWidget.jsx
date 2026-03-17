import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { TimeField } from '@plone/components';
import { Time } from '@internationalized/date';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  clearTime: {
    id: 'Clear time',
    defaultMessage: 'Clear time',
  },
});

/**
 * Parse a 'HH:mm' string into a Time object.
 */
const parseTimeString = (value) => {
  if (!value) return null;
  const [hours, minutes] = value.split(':').map(Number);
  return new Time(hours, minutes);
};

/**
 * Format a TimeValue object back to 'HH:mm' string.
 */
const formatTimeValue = (time) => {
  if (!time) return null;
  return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
};

export const TimeWidgetComponent = (props) => {
  const { id, resettable, value, onChange, isDisabled } = props;

  const intl = useIntl();

  const onTimeChange = useCallback(
    (time) => {
      if (time) {
        onChange(id, formatTimeValue(time));
      }
    },
    [id, onChange],
  );

  const onResetTime = useCallback(() => {
    onChange(id, null);
  }, [id, onChange]);

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <TimeField
          value={parseTimeString(value)}
          onChange={onTimeChange}
          isDisabled={isDisabled}
        />
        {resettable && (
          <button
            type="button"
            disabled={isDisabled || !value}
            onClick={onResetTime}
            className="item ui noborder button"
            aria-label={intl.formatMessage(messages.clearTime)}
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

TimeWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  resettable: PropTypes.bool,
};

TimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  resettable: true,
};

export default TimeWidgetComponent;
