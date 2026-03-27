import type { PropsWithChildren } from 'react';

import { cn } from '../../lib/utils';

type BlockInnerContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function BlockInnerContainer({
  children,
  className,
}: BlockInnerContainerProps) {
  return (
    <div className={cn('block-inner-container', className)}>{children}</div>
  );
}
