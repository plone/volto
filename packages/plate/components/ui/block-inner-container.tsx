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
    <div
      className={cn(
        'block-inner-container mx-auto grid w-full max-w-(--block-width) justify-items-start',
        className,
      )}
    >
      {children}
    </div>
  );
}
