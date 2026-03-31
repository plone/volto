import { type PlateElementProps, PlateElement } from 'platejs/react';

import { BlockInnerContainer } from './block-inner-container';

export function BlockquoteElement(props: PlateElementProps) {
  return (
    <PlateElement
      as="blockquote"
      className="my-1 border-l-2 pl-6 italic"
      {...props}
    >
      <BlockInnerContainer>{props.children}</BlockInnerContainer>
    </PlateElement>
  );
}
