import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toBackendLang } from '@plone/volto/helpers';

const DatetimeWidget = ({ value, children, className, format = 'lll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(toBackendLang(lang));

  // Separate function to reset the DatetimeWidget
  const handleReset = (event) => {
    event.preventDefault(); // Prevent form submission
    // Implement logic to reset the DatetimeWidget state here
    // For example, set value to null or empty string to reset the widget
  };

  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children
        ? children(moment(value).format(format))
        : moment(value).format(format)}
      <button onClick={handleReset}>Reset</button> {/* Reset button */}
    </span>
  ) : (
    ''
  );
};

export default DatetimeWidget;
