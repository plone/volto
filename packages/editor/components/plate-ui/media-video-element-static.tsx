import React from 'react';

import type { SlateElementProps } from '@udecode/plate';
import type { TCaptionElement } from '@udecode/plate-caption';
import type { TVideoElement } from '@udecode/plate-media';

import { cn } from '@udecode/cn';
import { NodeApi, SlateElement } from '@udecode/plate';

export function MediaVideoElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  const {
    align = 'center',
    caption,
    url,
    width,
  } = props.element as TVideoElement &
    TCaptionElement & {
      width: number;
    };

  return (
    <SlateElement className={cn(className, 'py-2.5')} {...props}>
      <div style={{ textAlign: align }}>
        <figure
          className="group relative m-0 inline-block cursor-default"
          style={{ width }}
        >
          <video
            className={cn('w-full max-w-full object-cover px-0', 'rounded-sm')}
            src={url}
            controls
          />
          {caption && <figcaption>{NodeApi.string(caption[0])}</figcaption>}
        </figure>
      </div>
      {children}
    </SlateElement>
  );
}
