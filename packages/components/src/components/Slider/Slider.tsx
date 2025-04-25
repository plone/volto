import React from 'react';
import {
  Label,
  Slider as RACSlider,
  SliderOutput,
  type SliderProps as RACSliderProps,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';

export interface SliderProps<T> extends RACSliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <RACSlider {...props}>
      <Label>{label}</Label>
      <SliderOutput>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack>
        {({ state }) =>
          state.values.map((_, i) => (
            <SliderThumb key={i} index={i} aria-label={thumbLabels?.[i]} />
          ))
        }
      </SliderTrack>
    </RACSlider>
  );
}
