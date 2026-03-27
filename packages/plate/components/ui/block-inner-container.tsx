import type { PropsWithChildren } from 'react';

type BlockInnerContainerProps = PropsWithChildren;

export function BlockInnerContainer({ children }: BlockInnerContainerProps) {
  return <div className="block-inner-container">{children}</div>;
}
