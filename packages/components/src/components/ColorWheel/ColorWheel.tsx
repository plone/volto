import * as React from 'react';
import {
  ColorThumb,
  ColorWheel as AriaColorWheel,
  type ColorWheelProps as AriaColorWheelProps,
  ColorWheelTrack,
} from 'react-aria-components';

export interface ColorWheelProps
  extends Omit<AriaColorWheelProps, 'outerRadius' | 'innerRadius'> {}

export function ColorWheel(props: ColorWheelProps) {
  return (
    <AriaColorWheel {...props} outerRadius={100} innerRadius={74}>
      <ColorWheelTrack />
      <ColorThumb />
    </AriaColorWheel>
  );
}

export { ColorWheel as MyColorWheel };
