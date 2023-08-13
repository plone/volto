import React, { useState } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import cx from 'classnames';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import { parseDateTime, toBackendLang } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import 'rc-time-picker/assets/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const TimePicker = loadable(() => import('rc-time-picker'));

const messages = defineMessages({
  date: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  time: {
    id: 'Time',
    defaultMessage: 'Time',
  },
});

const PrevIcon = () => (
  <div
    style={{
      color: '#000',
      left: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={leftKey} size="30px" />
  </div>
);
const NextIcon = () => (
  <div
    style={{
      color: '#000',
      right: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={rightKey} size="30px" />
  </div>
);

const defaultTimeDateOnly = {
  hour: 12,
  minute: 0,
  second: 0,
};

export const DatetimeWidgetComponent = (props) => {

  const { id, resettable, reactDates, widgetOptions } = props;
  const intl=useIntl();
  const moment = props.moment.default;
  const lang = useSelector((state) => state.intl.locale);
  const [focused, setFocused] = useState(false);
  const [isDefault, setisDefault] = useState(
    parseDateTime(
      toBackendLang(lang),
      props.value,
      undefined,
      moment,
    )?.toISOString() === moment().utc().toISOString(),
  );

  const getInternalValue = () => {
    return parseDateTime(toBackendLang(lang), props.value, undefined, moment);
  };

  const getDateOnly = () => {
    return props.dateOnly || props.widget === 'date';
  };

  const onDateChange = (date) => {
    if (date) {
      const isDateOnly = getDateOnly();
      const base = (getInternalValue() || moment()).set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        ...(isDateOnly ? defaultTimeDateOnly : {}),
      });
      const dateValue = isDateOnly
        ? base.format('YYYY-MM-DD')
        : base.toISOString();
      props.onChange(id, dateValue);
    }
    setisDefault(false);
  };

  const onTimeChange = (time) => {
    if (time) {
      const base = (getInternalValue() || moment()).set({
        hours: time?.hours() ?? 0,
        minutes: time?.minutes() ?? 0,
        seconds: 0,
      });
      const dateValue = base.toISOString();
      props.onChange(id, dateValue);
    }
  };

  const onResetDates = () => {
    setisDefault(false);
    props.onChange(id, null);
  };

  const onFocusChange = ({ focused }) => setFocused(focused);

  const noPastDates =
    props.noPastDates || widgetOptions?.pattern_options?.noPastDates;
  const datetime = getInternalValue();
  const dateOnly = getDateOnly();
  const { SingleDatePicker } = reactDates;

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div
          className={cx('ui input date-input', {
            'default-date': isDefault,
          })}
        >
          <SingleDatePicker
            date={datetime}
            disabled={props.isDisabled}
            onDateChange={onDateChange}
            focused={focused}
            numberOfMonths={1}
            {...(noPastDates ? {} : { isOutsideRange: () => false })}
            onFocusChange={onFocusChange}
            noBorder
            displayFormat={moment
              .localeData(toBackendLang(lang))
              .longDateFormat('L')}
            navPrev={<PrevIcon />}
            navNext={<NextIcon />}
            id={`${id}-date`}
            placeholder={intl.formatMessage(messages.date)}
          />
        </div>
        {!dateOnly && (
          <div
            className={cx('ui input time-input', {
              'default-date': isDefault,
            })}
          >
            <TimePicker
              disabled={props.isDisabled}
              defaultValue={datetime}
              value={datetime}
              onChange={onTimeChange}
              allowEmpty={false}
              showSecond={false}
              use12Hours={lang === 'en'}
              id={`${id}-time`}
              format={moment
                .localeData(toBackendLang(lang))
                .longDateFormat('LT')}
              placeholder={intl.formatMessage(messages.time)}
              focusOnOpen
              placement="bottomRight"
            />
          </div>
        )}
        {resettable && (
          <button
            disabled={props.isDisabled || !datetime}
            onClick={() => onResetDates()}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

DatetimeWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  dateOnly: PropTypes.bool,
  noPastDates: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  resettable: PropTypes.bool,
};

DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default compose(injectLazyLibs(['reactDates', 'moment']))(
  DatetimeWidgetComponent,
);
