import React from 'react';
import {
  Text,
  Button,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { CloseIcon } from '@plone/components/Icons';
import { type ToastItem } from '../../config/toast';
/**
 * Props Types for the SectionWrapper component.
 * They are able to infer the props of the element type passed to the `as` prop.
 */
type AppToastPropsType<T extends React.ElementType> = {
  queue: ToastQueue<ToastItem>;
} & React.ComponentPropsWithoutRef<React.ElementType>;

const AppToast = (props: AppToastPropsType<React.ElementType>) => {
  const { queue } = props;
  return (
    <ToastRegion queue={queue}>
      {({ toast }) => (
        <Toast toast={toast}>
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
