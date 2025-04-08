import * as React from 'react';
import {
  ColorSlider as RACColorSlider,
  type ColorSliderProps as RACColorSliderProps,
  ColorThumb,
  Label,
  SliderOutput,
  SliderTrack,
} from 'react-aria-components';

export interface ColorSliderProps extends RACColorSliderProps {
  label?: string;
}

export function ColorSlider({ label, ...props }: ColorSliderProps) {
  return (
    <RACColorSlider {...props}>
      <Label>{label}</Label>
      <SliderOutput />
      <SliderTrack
        style={({ defaultStyle }) => ({
          background: `${defaultStyle.background},
            repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      >
        <ColorThumb />
      </SliderTrack>
    </RACColorSlider>
  );
}
