import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { map } from 'lodash';
import { Form } from 'semantic-ui-react';
import SelectInput from './SelectInput';

/**
 * WeekdayOfTheMonthIndexField component class.
 * @function WeekdayOfTheMonthIndexField
 * @returns {string} Markup of the component.
 */

const messages = defineMessages({
  bymonthDayNumber: { id: 'Weeek day of month', defaultMessage: 'The' },

  first: { id: 'First', defaultMessage: 'First' },
  second: { id: 'Second', defaultMessage: 'Second' },
  third: { id: 'Third', defaultMessage: 'Third' },
  fourth: { id: 'Fourth', defaultMessage: 'Fourth' },
  last: { id: 'Last', defaultMessage: 'Last' },
});

const ORDINAL_NUMBERS = {
  '1': 'first',
  '2': 'second',
  '3': 'third',
  '4': 'fourth',
  '-1': 'last',
};

const WeekdayOfTheMonthIndexField = (props) => {
  const intl = useIntl();
  const { disabled } = props;
  const weekdayOfTheMonthIndexList = [
    ...map(Object.keys(ORDINAL_NUMBERS), (option) => ({
      value: parseInt(option),
      label: intl.formatMessage(messages[ORDINAL_NUMBERS[option]]),
    })),
  ];
  return (
    <>
      <Form.Field disabled={disabled}>
        {intl.formatMessage(messages.bymonthDayNumber)}
      </Form.Field>

      <Form.Field disabled={disabled}>
        <SelectInput
          name="weekdayOfTheMonthIndex"
          options={weekdayOfTheMonthIndexList}
          {...this.props}
        />
      </Form.Field>
    </>
  );
};

WeekdayOfTheMonthIndexField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

WeekdayOfTheMonthIndexField.defaultProps = {
  disabled: false,
  value: null,
  onChange: null,
};
export default WeekdayOfTheMonthIndexField;
