import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

const datesForDisplay = (start, end) => {
  const mStart = moment(start);
  const mEnd = moment(end);
  const sameDay = mStart.isSame(mEnd, 'day');
  const sameTime = mStart.isSame(mEnd, 'minute');
  return {
    sameDay,
    sameTime,
    startDate: mStart.format('ll'),
    startTime: mStart.format('LT'),
    endDate: mEnd.format('ll'),
    endTime: mEnd.format('LT'),
  };
};

const EventWhen = ({ start, end = '', whole_day, open_end }) => {
  const datesInfo = datesForDisplay(start, end);
  // TODO I18N INTL
  return (
    <p
      className={cx('event-when', {
        'same-day': datesInfo.sameDay,
        'same-time': datesInfo.sameTime,
        'whole-day': whole_day,
        'open-end': open_end,
      })}
    >
      {!datesInfo.sameDay ? (
        <>
          <span className="start">
            <span className="start-date">{datesInfo.startDate}</span>
            {!whole_day && (
              <>
                {/* Plone has an optional word based on locale here */}
                <span> </span>
                <span className="start-time">{datesInfo.startTime}</span>
              </>
            )}
          </span>
          &nbsp;to&nbsp;
          <span className="end">
            <span className="end-date">{datesInfo.endDate}</span>
            {!whole_day && (
              <>
                {/* Plone has an optional word based on locale here */}
                <span> </span>
                <span className="end-time">{datesInfo.endTime}</span>
              </>
            )}
          </span>
        </>
      ) : (
        <>
          {whole_day && (
            <span className="start-date">{datesInfo.startDate}</span>
          )}
          {open_end && !whole_day && (
            <>
              <span className="start-date">{datesInfo.startDate}</span>
              &nbsp;from&nbsp;
              <span className="start-time">{datesInfo.startTime}</span>
            </>
          )}
          {!(whole_day || open_end) && (
            <>
              <span className="start-date">{datesInfo.startDate}</span>
              &nbsp;from&nbsp;
              <span className="start-time">{datesInfo.startTime}</span>
              &nbsp;to&nbsp;
              <span className="end-time">{datesInfo.endTime}</span>
            </>
          )}
        </>
      )}
    </p>
  );
};

EventWhen.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  whole_day: PropTypes.bool,
  open_end: PropTypes.bool,
};

export default EventWhen;
