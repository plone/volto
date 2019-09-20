import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import { datesForDisplay } from './EventWhen';

const Recurrence = props => {
  const reccDates = [];
  const arr = props.recurrence.split(';');
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
