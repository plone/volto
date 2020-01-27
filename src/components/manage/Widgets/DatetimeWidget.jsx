/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Label } from 'semantic-ui-react';
import { map } from 'lodash';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

/**
 * DatetimeWidget component class.
 * @function DatetimeWidget
 * @returns {string} Markup of the component.
 */
const DatetimeWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
}) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(value ? moment(value) : moment());
  const [time, setTime] = useState(value ? moment(value) : moment());

  const onDateChange = date => {
    setDate(date);
    onDateTimeChange(date);
  };

  const onTimeChange = time => {
    setTime(time);
    onDateTimeChange();
  };

  const onDateTimeChange = () => {
    let newDate = date;
    newDate.hours(time.hours());
    newDate.minutes(time.minutes());
    newDate.seconds(0);
    console.log(date.toISOString());
    onChange(id, newDate.toISOString());
  };

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={description ? 'help' : ''}
      id={`${fieldSet || 'field'}-${id}`}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            {/* <Input
              id={`field-${id}`}
              name={id}
              type="datetime-local"
              value={value || ''}
              onChange={({ target }) =>
                onChange(id, target.value === '' ? undefined : target.value)
              }
            /> */}
            <SingleDatePicker
              date={date}
              onDateChange={date => onDateChange(date)}
              focused={focused}
              onFocusChange={({ focused }) => setFocused(focused)}
              id={id}
            />
            <TimePicker
              defaultValue={time}
              onChange={time => onTimeChange(time)}
              showSecond={false}
            />
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DatetimeWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
DatetimeWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default DatetimeWidget;
