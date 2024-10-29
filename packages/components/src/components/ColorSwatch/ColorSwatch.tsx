import * as React from 'react';
import {
  ColorSwatch as RACColorSwatch,
  ColorSwatchProps,
} from 'react-aria-components';

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <RACColorSwatch
      {...props}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
}
