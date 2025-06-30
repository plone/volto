import { forwardRef, type ComponentProps, type ForwardedRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from '@plone/components/quanta';

const IconButton = forwardRef(function _IconButton(
  props: ComponentProps<typeof Button>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      {...props}
      className={twMerge(
        clsx(
          'pressed:border-transparent text-quanta-pigeon border-transparent p-0 disabled:border-transparent',
          props.className,
        ),
      )}
    />
  );
});

export default IconButton;
