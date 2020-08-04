/**
 * WeekdayOfTheMonthField component.
 * @module components/manage/Widgets/RecurrenceWidget/WeekdayOfTheMonthField
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import moment from 'moment';
import { Days } from './Utils';
import SelectInput from './SelectInput';
import { Form } from 'semantic-ui-react';

/**
 * WeekdayOfTheMonthField component class.
 * @function WeekdayOfTheMonthField
 * @returns {string} Markup of the component.
 */

class WeekdayOfTheMonthField extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    disabled: false,
    value: null,
    onChange: null,
  };

  render() {
    const { disabled } = this.props;

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
          {...this.props}
        />
      </Form.Field>
    );
  }
}

export default WeekdayOfTheMonthField;
