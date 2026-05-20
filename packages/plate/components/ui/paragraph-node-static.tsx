import type { SlateElementProps } from 'platejs';

import { SlateElement } from 'platejs';

import { BlockInnerContainer } from './block-inner-container';
import { cn } from '../../lib/utils';

export function ParagraphElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} className={cn('m-0 px-0 py-1')}>
      <BlockInnerContainer>{props.children}</BlockInnerContainer>
    </SlateElement>
  );
}
