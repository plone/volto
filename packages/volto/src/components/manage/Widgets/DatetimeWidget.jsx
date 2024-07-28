/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
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

/**
 * DatetimeWidget component function
 * @function DatetimeWidgetComponent
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Publish date",
 *  type: 'datetime',
 * }
 * ```
 */
const DatetimeWidgetComponent = ({
  id,
  resettable,
  intl,
  reactDates,
  widgetOptions,
  lang,
  value,
  onChange,
  dateOnly,
  noPastDates,
  isDisabled,
  moment: momentLib,
  ...props
}) => {
  const moment = momentLib.default;

  const initialInternalValue = useMemo(() => {
    return parseDateTime(toBackendLang(lang), value, undefined, moment);
  }, [lang, value, moment]);

  const [focused, setFocused] = useState(false);
  const [isDefault, setIsDefault] = useState(
    initialInternalValue?.toISOString() === moment().utc().toISOString(),
  );

  const getInternalValue = useCallback(() => {
    return parseDateTime(toBackendLang(lang), value, undefined, moment);
  }, [lang, value, moment]);

  const getDateOnly = useCallback(() => {
    return dateOnly || props.widget === 'date';
  }, [dateOnly, props.widget]);

  const handleDateChange = useCallback(
    (date) => {
      if (date) {
        const base = (getInternalValue() || moment()).set({
          year: date.year(),
          month: date.month(),
          date: date.date(),
          ...(getDateOnly() ? defaultTimeDateOnly : {}),
        });
        const dateValue = getDateOnly()
          ? base.format('YYYY-MM-DD')
          : base.toISOString();
        onChange(id, dateValue);
      }
      setIsDefault(false);
    },
    [getInternalValue, getDateOnly, onChange, id, moment],
  );

  const handleTimeChange = useCallback(
    (time) => {
      if (time) {
        const base = (getInternalValue() || moment()).set({
          hours: time?.hours() ?? 0,
          minutes: time?.minutes() ?? 0,
          seconds: 0,
        });
        const dateValue = base.toISOString();
        onChange(id, dateValue);
      }
    },
    [getInternalValue, onChange, id, moment],
  );

  const handleResetDates = useCallback(() => {
    setIsDefault(false);
    onChange(id, null);
  }, [onChange, id]);

  const handleFocusChange = useCallback(({ focused }) => {
    setFocused(focused);
  }, []);

  useEffect(() => {
    setIsDefault(
      initialInternalValue?.toISOString() === moment().utc().toISOString(),
    );
  }, [initialInternalValue, moment]);

  const { SingleDatePicker } = reactDates;
  const datetime = getInternalValue();
  const dateOnlyValue = getDateOnly();
  const noPastDatesValue =
    noPastDates || widgetOptions?.pattern_options?.noPastDates;

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
            disabled={isDisabled}
            onDateChange={handleDateChange}
            focused={focused}
            numberOfMonths={1}
            {...(noPastDatesValue ? {} : { isOutsideRange: () => false })}
            onFocusChange={handleFocusChange}
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
        {!dateOnlyValue && (
          <div
            className={cx('ui input time-input', {
              'default-date': isDefault,
            })}
          >
            <TimePicker
              disabled={isDisabled}
              defaultValue={datetime}
              value={datetime}
              onChange={handleTimeChange}
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
            // FF needs that the type is "button" in order to not POST the form
            type="button"
            disabled={isDisabled || !datetime}
            onClick={handleResetDates}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
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

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
DatetimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default compose(
  injectLazyLibs(['reactDates', 'moment']),
  connect((state) => ({
    lang: state.intl.locale,
  })),
  injectIntl,
)(DatetimeWidgetComponent);
