/**
 * ByYearField component.
 * @module components/manage/Widgets/RecurrenceWidget/ByYearField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Form, Grid, Radio } from 'semantic-ui-react';

import ByMonthDayField from './ByMonthDayField';
import MonthOfTheYearField from './MonthOfTheYearField';
import WeekdayOfTheMonthIndexField from './WeekdayOfTheMonthIndexField';
import WeekdayOfTheMonthField from './WeekdayOfTheMonthField';
const messages = defineMessages({
  ofTheMonth: { id: 'of the month', defaultMessage: 'of the month' },
});
/**
 * ByYearField component class.
 * @function ByYearField
 * @returns {string} Markup of the component.
 */
const ByYearField = ({
  label,
  value,
  bymonthday,
  monthOfTheYear,
  weekdayOfTheMonthIndex,
  weekdayOfTheMonth,
  onChange,
  intl,
}) => {
  return (
    <Form.Field inline className="text byyear-field">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="yearly">{label}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Form.Group inline className="byyear-bymonthday">
              <Form.Field>
                <Radio
                  label=""
                  name="yearly"
                  value="bymonthday"
                  id="yearly-bymonthday"
                  checked={value === 'bymonthday'}
                  onChange={(e, { value }) => onChange('yearly', value)}
                />
              </Form.Field>

              <ByMonthDayField
                value={bymonthday}
                disabled={value !== 'bymonthday'}
                onChange={onChange}
                hideAfterLabel={true}
              />

              <MonthOfTheYearField
                value={monthOfTheYear}
                disabled={value !== 'bymonthday'}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group inline className="byyear-byday">
              <Form.Field>
                <Radio
                  label=""
                  name="yearly"
                  id="yearly-byday"
                  value="byday"
                  checked={value === 'byday'}
                  onChange={(e, { value }) => onChange('yearly', value)}
                />
              </Form.Field>

              <WeekdayOfTheMonthIndexField
                disabled={value !== 'byday'}
                value={weekdayOfTheMonthIndex}
                onChange={onChange}
              />

              <WeekdayOfTheMonthField
                disabled={value !== 'byday'}
                value={weekdayOfTheMonth}
                onChange={onChange}
              />

              <Form.Field disabled={value !== 'byday'}>
                {intl.formatMessage(messages.ofTheMonth)}
              </Form.Field>

              <MonthOfTheYearField
                value={monthOfTheYear}
                disabled={value !== 'byday'}
                onChange={onChange}
                inline={false}
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ByYearField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  bymonthday: PropTypes.any,
  monthOfTheYear: PropTypes.any,
  weekdayOfTheMonthIndex: PropTypes.any,
  weekdayOfTheMonth: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ByYearField.defaultProps = {
  label: null,
  value: null,
  bymonthday: null,
  monthOfTheYear: null,
  weekdayOfTheMonthIndex: null,
  weekdayOfTheMonth: null,
  onChange: null,
};

export default injectIntl(ByYearField);
