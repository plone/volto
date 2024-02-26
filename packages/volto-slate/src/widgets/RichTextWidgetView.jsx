import React from 'react';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { ErrorBoundary } from './ErrorBoundary';
import { defineMessages, injectIntl } from 'react-intl';
import './style.css';

const messages = defineMessages({
  error: {
    id: 'An error has occurred while rendering "{name}" field. We have been notified and we are looking into it. If the issue persists please contact the site administrator.',
    defaultMessage:
      'An error has occurred while rendering "{name}" field. We have been notified and we are looking into it. If the issue persists please contact the site administrator.',
  },
});

export const SlateRichTextWidgetView = ({
  value,
  children,
  className,
  intl,
}) => {
  const Block = config.blocks.blocksConfig.slate.view;
  return value ? (
    <ErrorBoundary
      name={intl.formatMessage(messages.error, { name: className })}
    >
      <div className={cx(className, 'slate', 'widget')}>
        <Block data={{ value: value }}>{children}</Block>
      </div>
    </ErrorBoundary>
  ) : (
    ''
  );
};

export default injectIntl(SlateRichTextWidgetView);
