import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import cx from 'classnames';

import { toBackendLang } from '@plone/volto/helpers';
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
  const lang = useSelector((state) => state.intl.locale);

  const moment = momentlib.default;
  moment.locale(toBackendLang(lang));

  const datesInfo = datesForDisplay(start, end, moment);
  if (!datesInfo) {
    return;
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
          {!open_end && (
            <>
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
          )}
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
