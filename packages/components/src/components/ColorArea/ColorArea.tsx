import * as React from 'react';
import {
  ColorArea as RACColorArea,
  ColorAreaProps,
  ColorThumb,
} from 'react-aria-components';

export function ColorArea(props: ColorAreaProps) {
  return (
    <RACColorArea {...props}>
      <ColorThumb />
    </RACColorArea>
  );
}
