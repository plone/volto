import React from 'react';
import cx from 'classnames';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  yes: {
    id: 'yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'no',
    defaultMessage: 'No',
  },
});

const BooleanWidget = ({ value, children, className, intl }) => {
  return isBoolean(value) ? (
    <span className={cx(className, 'boolean', 'widget')}>
      {children
        ? children(
            value
              ? intl.formatMessage(messages.yes)
              : intl.formatMessage(messages.no),
          )
        : value
          ? intl.formatMessage(messages.yes)
          : intl.formatMessage(messages.no)}
    </span>
  ) : (
    ''
  );
};

export default injectIntl(BooleanWidget);
