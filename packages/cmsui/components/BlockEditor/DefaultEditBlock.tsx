import type { BlockEditProps } from '@plone/types';
import type { ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'div'> & BlockEditProps;

export default function DefaultEditBlock(props: Props) {
  return (
    <div
      ref={props.ref}
      tabIndex={-1}
      role="group"
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          // @ts-expect-error
          props.onFocusNextBlock?.();
        }
        if (e.key === 'ArrowUp') {
          // @ts-expect-error
          props.onFocusPreviousBlock?.();
        }
        if (e.key === 'Tab') {
          e.preventDefault();
        }
      }}
      aria-label="Default edit block"
    >
      {props.data['@type']}
    </div>
  );
}
