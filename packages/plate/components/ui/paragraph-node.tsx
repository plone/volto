import type { PlateElementProps } from 'platejs/react';

import { PlateElement } from 'platejs/react';

import { BlockInnerContainer } from './block-inner-container';
import { cn } from '../../lib/utils';

export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement {...props} className={cn('m-0 px-0 py-1')}>
      <BlockInnerContainer>{props.children}</BlockInnerContainer>
    </PlateElement>
  );
}
