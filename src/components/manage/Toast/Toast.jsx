import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@plone/volto/components';

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
    } else if (props.error) {
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
        <p>{content}</p>
      </div>
    </>
  );
};

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  info: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

export default Toast;
