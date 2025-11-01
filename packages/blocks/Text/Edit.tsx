import type { ComponentPropsWithRef } from 'react';
import type { BlockEditProps } from '@plone/types';
// import config from '@plone/registry';

type Props = ComponentPropsWithRef<'textarea'> &
  BlockEditProps & {
    onFocusSidebar?: () => void;
  };

export default function TextBlockEdit(props: Props) {
  if (props.data['@type'] !== 'slate') return null;
  return (
    <textarea
      ref={props.ref}
      rows={5}
      style={{ border: '1px dashed green' }}
      placeholder={props.data.placeholder}
      onKeyDown={(e) => {
        if (
          e.key === 'ArrowDown' &&
          e.currentTarget.selectionStart === e.currentTarget.value.length &&
          e.currentTarget.selectionEnd === e.currentTarget.value.length
        ) {
          // @ts-expect-error
          props.onFocusNextBlock?.();
        }
        if (
          e.key === 'ArrowUp' &&
          e.currentTarget.selectionStart === 0 &&
          e.currentTarget.selectionEnd === 0
        ) {
          // @ts-expect-error
          props.onFocusPreviousBlock?.();
        }
        if (e.key === 'Tab') {
          e.preventDefault();
          if (!e.shiftKey) props.onFocusSidebar?.();
        }
      }}
    />
  );
}
