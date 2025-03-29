import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import successSVG from '@plone/volto/icons/ready.svg';
import infoSVG from '@plone/volto/icons/info.svg';
import errorSVG from '@plone/volto/icons/error.svg';
import warningSVG from '@plone/volto/icons/warning.svg';

const Toast = (props) => {
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

  const { title, content } = props;

  return (
    <>
      <Icon name={getIcon(props)} size="18px" />
      <div className="toast-inner-content">
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
