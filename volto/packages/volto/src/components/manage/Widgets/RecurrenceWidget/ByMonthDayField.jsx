/**
 * ByMonthDayField component.
 * @module components/manage/Widgets/RecurrenceWidget/ByMonthDayField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Form, Input } from 'semantic-ui-react';

const messages = defineMessages({
  bymonthDay: { id: 'Month day', defaultMessage: 'Day' },
  ofTheMonth: { id: 'of the month', defaultMessage: 'of the month' },
});
/**
 * ByMonthDayField component class.
 * @function ByMonthDayField
 * @returns {string} Markup of the component.
 */
const ByMonthDayField = ({
  value,
  disabled,
  onChange,
  hideAfterLabel,
  intl,
}) => {
  return (
    <>
      <Form.Field inline disabled={disabled}>
        {intl.formatMessage(messages.bymonthDay)}
      </Form.Field>
      <Form.Field inline disabled={disabled}>
        <Input
          type="number"
          id="bymonthday"
          name="bymonthday"
          value={value || ''}
          onChange={({ target }) => {
            onChange(
              target.id,
              target.value === '' ? undefined : [parseInt(target.value)],
            );
          }}
        />
      </Form.Field>
      {!hideAfterLabel && (
        <Form.Field inline disabled={disabled}>
          {intl.formatMessage(messages.ofTheMonth)}
        </Form.Field>
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ByMonthDayField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  hideAfterLabel: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ByMonthDayField.defaultProps = {
  disabled: false,
  value: null,
  onChange: null,
  hideAfterLabel: false,
};

export default injectIntl(ByMonthDayField);
