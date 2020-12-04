/**
 * WeekdayOfTheMonthField component.
 * @module components/manage/Widgets/RecurrenceWidget/WeekdayOfTheMonthField
 */

import React from 'react';
import { map } from 'lodash';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { Days } from './Utils';
import SelectInput from './SelectInput';
import { Form } from 'semantic-ui-react';

/**
 * WeekdayOfTheMonthField component class.
 * @function WeekdayOfTheMonthField
 * @returns {string} Markup of the component.
 */

const WeekdayOfTheMonthField = (props) => {
  const { disabled = false } = props;
  const intl = useIntl();
  moment.locale(intl.locale);

  const weekdayOfTheMonthList = [
    ...map(Object.keys(Days), (d) => ({
      value: Days[d].weekday,
      label: moment.weekdays(Days[d].weekday + 1),
    })),
  ];

  return (
    <Form.Field disabled={disabled}>
      <SelectInput
        name="weekdayOfTheMonth"
        options={weekdayOfTheMonthList}
        {...props}
      />
    </Form.Field>
  );
};

export default WeekdayOfTheMonthField;
