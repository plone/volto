/**
 * ByMonthField component.
 * @module components/manage/Widgets/RecurrenceWidget/ByMonthField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Grid, Radio } from 'semantic-ui-react';
import ByMonthDayField from './ByMonthDayField';
import WeekdayOfTheMonthIndexField from './WeekdayOfTheMonthIndexField';
import WeekdayOfTheMonthField from './WeekdayOfTheMonthField';

/**
 * ByMonthField component class.
 * @function ByMonthField
 * @returns {string} Markup of the component.
 */
const ByMonthField = ({
  label,
  value,
  bymonthday,
  weekdayOfTheMonthIndex,
  weekdayOfTheMonth,
  onChange,
  intl,
}) => {
  return (
    <Form.Field inline className="text">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="monthly">{label}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Form.Group inline>
              <Form.Field>
                <Radio
                  label=""
                  name="monthly"
                  id="monthly-bymonthday"
                  value="bymonthday"
                  checked={value === 'bymonthday'}
                  onChange={(e, { value }) => onChange('monthly', value)}
                />
              </Form.Field>
              <ByMonthDayField
                value={bymonthday}
                disabled={value !== 'bymonthday'}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <Radio
                  label=""
                  name="monthly"
                  id="monthly-byweekday"
                  value="byweekday"
                  checked={value === 'byweekday'}
                  onChange={(e, { value }) => onChange('monthly', value)}
                />
              </Form.Field>

              <WeekdayOfTheMonthIndexField
                disabled={value !== 'byweekday'}
                value={weekdayOfTheMonthIndex}
                onChange={onChange}
              />

              <WeekdayOfTheMonthField
                disabled={value !== 'byweekday'}
                value={weekdayOfTheMonth}
                onChange={onChange}
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
ByMonthField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  bymonthday: PropTypes.any,
  weekdayOfTheMonthIndex: PropTypes.any,
  weekdayOfTheMonth: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ByMonthField.defaultProps = {
  label: null,
  value: null,
  bymonthday: null,
  weekdayOfTheMonthIndex: null,
  weekdayOfTheMonth: null,
  onChange: null,
};

export default injectIntl(ByMonthField);
