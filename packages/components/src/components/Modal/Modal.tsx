import React from 'react';
import {
  Modal as RACModal,
  type ModalOverlayProps,
} from 'react-aria-components';

export function Modal(props: ModalOverlayProps) {
  return <RACModal {...props} />;
}
