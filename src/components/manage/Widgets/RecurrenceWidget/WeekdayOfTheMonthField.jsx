/**
 * WeekdayOfTheMonthField component.
 * @module components/manage/Widgets/RecurrenceWidget/WeekdayOfTheMonthField
 */

import React from 'react';
import { map } from 'lodash';
import { useIntl } from 'react-intl';
import { Days } from './Utils';
import SelectInput from './SelectInput';
import { Form } from 'semantic-ui-react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

/**
 * WeekdayOfTheMonthField component class.
 * @function WeekdayOfTheMonthField
 * @returns {string} Markup of the component.
 */

const WeekdayOfTheMonthField = (props) => {
  const { disabled = false, moment: momentlib } = props;
  const intl = useIntl();

  const moment = momentlib.default;
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

export default injectLazyLibs(['moment'])(WeekdayOfTheMonthField);
