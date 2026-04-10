import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import successSVG from '@plone/volto/icons/ready.svg';
import infoSVG from '@plone/volto/icons/info.svg';
import errorSVG from '@plone/volto/icons/error.svg';
import warningSVG from '@plone/volto/icons/warning.svg';

const messages = defineMessages({
  success: {
    id: 'toast_type_success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'toast_type_error',
    defaultMessage: 'Error',
  },
  warning: {
    id: 'toast_type_warning',
    defaultMessage: 'Warning',
  },
  info: {
    id: 'toast_type_info',
    defaultMessage: 'Information',
  },
});

const Toast = (props) => {
  const intl = useIntl();

  function getIcon(props) {
    if (props.info) {
      return infoSVG;
    } else if (props.success) {
      return successSVG;
    } else if (props.error) {
      return errorSVG;
    } else if (props.warning) {
      return warningSVG;
    } else {
      return successSVG;
    }
  }

  function getTypeLabel(props) {
    if (props.error) return intl.formatMessage(messages.error);
    if (props.warning) return intl.formatMessage(messages.warning);
    if (props.info) return intl.formatMessage(messages.info);
    if (props.success) return intl.formatMessage(messages.success);
    return null;
  }

  const { title, content } = props;
  const typeLabel = getTypeLabel(props);

  return (
    <>
      <Icon name={getIcon(props)} size="18px" />
      <div className="toast-inner-content">
        {typeLabel && (
          <span className="toast-visually-hidden">{typeLabel}</span>
        )}
        {title && <h4>{title}</h4>}
        <div>{content}</div>
      </div>
    </>
  );
};

Toast.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  info: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

export default Toast;
