import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import { datesForDisplay } from './EventWhen';

const findRecurrence = props => {
  const reccDates = [];
  const arr = props.recurrence.split(';');
  const days = arr[1].substring(arr[1].indexOf('=') + 1, arr[1].length);
  const num = arr[arr.length - 1];
  const count = num.match(/[0-9]/g);
  const newDates = datesForDisplay(props.start, props.end);
  if (arr[0].includes('DAILY')) {
    let firstDate = moment(newDates.startDate);
    for (let i = 1; i <= parseInt(count); i++) {
      reccDates.push(
        firstDate
          .add(1, 'days')
          ._d.toString()
          .substring(0, 15)
          .concat(` from ${newDates.startTime} to ${newDates.endTime}`),
      );
    }
  } else if (arr[0].includes('WEEKLY')) {
    let firstDate = moment(newDates.startDate);
    //console.log(days)
    days.split(',').map(item => {
      reccDates.push(
        firstDate
          .day(item)
          ._d.toString()
          .substring(0, 15)
          .concat(` from ${newDates.startTime} to ${newDates.endTime}`),
      );
    });
  } else if (arr[0].includes('MONTHLY')) {
    let firstDate = moment(newDates.startDate);
    //console.log(days, firstDate)
    for (let i = 1; i <= parseInt(count); i++) {
      reccDates.push(
        firstDate
          .day(days)
          ._d.toString()
          .substring(0, 15)
          .concat(` from ${newDates.startTime} to ${newDates.endTime}`),
      );
    }
  }
  return reccDates;
};

const Recurrence = props => {
  const reccDates = findRecurrence(props);
  if (reccDates.length > 0) {
    return (
      <div>
        <List items={reccDates} />
      </div>
    );
  }
  return (
    <>
      <List items={[props.recurrence]} />
    </>
  );
};

Recurrence.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  recurrence: PropTypes.string.isRequired,
};

export default Recurrence;
