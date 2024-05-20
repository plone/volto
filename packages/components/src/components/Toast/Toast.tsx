import React from 'react';
import { CheckboxIcon, InfoIcon, CloseIcon } from '../Icons';

interface Props {
  title?: string | Array<any>;
  content: string;
  info?: boolean;
  success?: boolean;
  error?: boolean;
  warning?: boolean;
}

export function Toast(props: Props) {
  function getIcon(props: Props) {
    if (props.info) {
      return InfoIcon;
    } else if (props.success) {
      return CheckboxIcon;
    } else if (props.error) {
      return CloseIcon;
    } else if (props.warning) {
      return CloseIcon;
    } else {
      return CheckboxIcon;
    }
  }

  const { title, content } = props;

  const Icon = getIcon(props);

  return (
    <>
      <Icon size="S" />
      <div className="toast-inner-content">
        {title && <h4>{title}</h4>}
        <p>{content}</p>
      </div>
    </>
  );
}
