import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { useSelector } from 'react-redux';

export const datesForDisplay = (start, end, moment) => {
  const mStart = moment(start);
  const mEnd = moment(end);
  if (!mStart.isValid() || !mEnd.isValid()) {
    return null;
  }
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

const When_ = ({ start, end, whole_day, open_end, moment: momentlib }) => {
  const intl = useIntl();
  const lang = useSelector((state) => state.intl.locale);

  const moment = momentlib.default;
  moment.locale(toBackendLang(lang));

  const messages = defineMessages({
    dateTimeToDateTime: {
      id: '<span className="start">{startDate}<span> </span>{startTime}</span> to <span className="end">{endDate}<span> </span>{endTime}</span>',
      defaultMessage:
        '<span className="start">{startDate}<span> </span>{startTime}</span> to <span className="end">{endDate}<span> </span>{endTime}</span>',
    },
    dateToDate: {
      id: '<span className="start">{startDate}</span> to <span className="end">{endDate}</span>',
      defaultMessage:
        '<span className="start">{startDate}</span> to <span className="end">{endDate}</span>',
    },
    dateFromTime: {
      id: '{date} from {time}',
      defaultMessage: '{date} from {time}',
    },
    dateFromTimeToTime: {
      id: '{date} from {startTime} to {endTime}',
      defaultMessage: '{date} from {startTime} to {endTime}',
    },
  });

  const datesInfo = datesForDisplay(start, end, moment);
  if (!datesInfo) {
    return;
  }

  const sameDay = datesInfo.sameDay;
  let when = null;

  if (!sameDay && whole_day && !open_end) {
    // Different day, whole day
    when = intl.formatMessage(messages.dateTimeToDateTime, {
      startDate: <span className="start-date">{datesInfo.startDate}</span>,
      startTime: <span className="start-time">{datesInfo.startTime}</span>,
      endDate: <span className="end-date">{datesInfo.endDate}</span>,
      endTime: <span className="end-time">{datesInfo.endTime}</span>,
    });
  } else if (!sameDay && !whole_day && !open_end) {
    // Different day, not whole day
    when = intl.formatMessage(messages.dateToDate, {
      startDate: <span className="start-date">{datesInfo.startDate}</span>,
      endDate: <span className="end-date">{datesInfo.endDate}</span>,
    });
  } else if (sameDay && whole_day && !open_end) {
    // Same day, whole day
    when = <span className="start-date">{datesInfo.startDate}</span>;
  } else if (sameDay && !whole_day && open_end) {
    // Same day, not whole day, open end
    when = intl.formatMessage(messages.dateFromTime, {
      date: <span className="start-date">{datesInfo.startDate}</span>,
      time: <span className="start-time">{datesInfo.startTime}</span>,
    });
  } else {
    // Same day, not whole day, not open end
    when = intl.formatMessage(messages.dateFromTimeToTime, {
      date: <span className="start-date">{datesInfo.startDate}</span>,
      startTime: <span className="start-time">{datesInfo.startTime}</span>,
      endTime: <span className="end-time">{datesInfo.endTime}</span>,
    });
  }

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
      {when}
    </p>
  );
};

export const When = injectLazyLibs(['moment'])(When_);

When.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  whole_day: PropTypes.bool,
  open_end: PropTypes.bool,
};

export const Recurrence_ = ({
  recurrence,
  start,
  moment: momentlib,
  rrule,
}) => {
  const moment = momentlib.default;
  const { RRule, rrulestr } = rrule;
  if (recurrence.indexOf('DTSTART') < 0) {
    var dtstart = RRule.optionsToString({
      dtstart: new Date(start),
    });
    recurrence = dtstart + '\n' + recurrence;
  }
  const rule = rrulestr(recurrence, { unfold: true, forceset: true });

  return (
    <List
      items={rule
        .all()
        .map((date) => datesForDisplay(date, undefined, moment))
        .map((date) => date.startDate)}
    />
  );
};
export const Recurrence = injectLazyLibs(['moment', 'rrule'])(Recurrence_);

Recurrence.propTypes = {
  recurrence: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};
