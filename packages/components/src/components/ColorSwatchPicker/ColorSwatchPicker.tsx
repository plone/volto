import * as React from 'react';
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
} from 'react-aria-components';

import { ColorSwatch } from '../ColorSwatch/ColorSwatch';

export function ColorSwatchPicker({
  children,
  ...props
}: ColorSwatchPickerProps) {
  return <AriaColorSwatchPicker {...props}>{children}</AriaColorSwatchPicker>;
}

export { ColorSwatchPicker as MyColorSwatchPicker };

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props}>
      <ColorSwatch />
    </AriaColorSwatchPickerItem>
  );
}
