/**
 * ByDayField component.
 * @module components/manage/Widgets/RecurrenceWidget/ByDayField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Days } from './Utils';
import { useIntl } from 'react-intl';

/**
 * ByDayField component class.
 * @function ByDayField
 * @returns {string} Markup of the component.
 */
const ByDayField = ({ label, value, onChange }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  const toggleWeekDay = (dayName) => {
    var day = Days[dayName];
    var byweekday = value ? [...value] : [];

    var i = byweekday.indexOf(day);
    if (i >= 0) {
      byweekday.splice(i, 1);
    } else {
      byweekday.push(day);
    }
    onChange('byweekday', byweekday);
  };

  return (
    <Form.Field inline className="text">
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="byday">{label}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Button.Group basic className="byday-field">
              {Object.keys(Days).map((d) => (
                <Button
                  key={d}
                  active={value?.indexOf(Days[d]) >= 0}
                  type="button"
                  content={moment.weekdaysShort(Days[d].weekday + 1)}
                  onClick={() => {
                    toggleWeekDay(d);
                  }}
                />
              ))}
            </Button.Group>
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
ByDayField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ByDayField.defaultProps = {
  label: null,
  value: null,
  onChange: null,
};

export default ByDayField;
