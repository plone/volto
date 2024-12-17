/**
 * WeekdayOfTheMonthField component.
 * @module components/manage/Widgets/RecurrenceWidget/WeekdayOfTheMonthField
 */

import React from 'react';
import map from 'lodash/map';
import { Days } from './Utils';
import SelectInput from './SelectInput';
import { Form } from 'semantic-ui-react';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { useSelector } from 'react-redux';
import moment from 'moment';

/**
 * WeekdayOfTheMonthField component class.
 * @function WeekdayOfTheMonthField
 * @returns {string} Markup of the component.
 */

const WeekdayOfTheMonthField = (props) => {
  const { disabled = false } = props;
  const lang = useSelector((state) => state.intl.locale);

  moment.locale(toBackendLang(lang));

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
