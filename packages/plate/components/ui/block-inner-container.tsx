import type { CSSProperties, PropsWithChildren } from 'react';

import { cn } from '../../lib/utils';

type BlockInnerContainerProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export function BlockInnerContainer({
  children,
  className,
  style,
}: BlockInnerContainerProps) {
  return (
    <div className={cn('block-inner-container', className)} style={style}>
      {children}
    </div>
  );
}
