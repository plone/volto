import type { SlateElementProps } from 'platejs';

import { ChevronRight } from 'lucide-react';
import { SlateElement } from 'platejs';

import { BlockInnerContainer } from './block-inner-container';

export function ToggleElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props}>
      <BlockInnerContainer className="relative pl-6">
        <div
          className={`
            absolute top-0 -left-0.5 size-6 cursor-pointer items-center justify-center rounded-md
            p-px text-muted-foreground transition-colors select-none
            hover:bg-accent
            [&_svg]:size-4
          `}
          contentEditable={false}
        >
          <ChevronRight className="rotate-0 transition-transform duration-75" />
        </div>
        {props.children}
      </BlockInnerContainer>
    </SlateElement>
  );
}
