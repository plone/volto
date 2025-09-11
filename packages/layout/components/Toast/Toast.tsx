import React from 'react';
import {
  Text,
  Button,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { CloseIcon } from '@plone/components/Icons';
import { type ToastQueue } from '../../config/toast';
/**
 * Props Types for the SectionWrapper component.
 * They are able to infer the props of the element type passed to the `as` prop.
 */
type AppToastPropsType<T extends React.ElementType> = {
  queue: ToastQueue;
} & React.ComponentPropsWithoutRef<React.ElementType>;

const AppToast = (props: AppToastPropsType<React.ElementType>) => {
  const { queue } = props;
  return (
    <ToastRegion queue={queue}>
      {({ toast }) => (
        <Toast
          toast={toast}
          className={['react-aria-Toast', toast.content.className].join(' ')}
        >
          <ToastContent>
            <Text slot="title">
              {toast.content.icon ? (
                <span className="toast-icon">{toast.content.icon}</span>
              ) : (
                <></>
              )}
              {toast.content.title}
            </Text>
            <Text slot="description">{toast.content.description}</Text>
          </ToastContent>
          <Button slot="close">
            <CloseIcon />
          </Button>
        </Toast>
      )}
    </ToastRegion>
  );
};

export default AppToast;
