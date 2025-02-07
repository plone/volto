import * as React from 'react';
import {
  Button,
  ColorPicker as RACColorPicker,
  type ColorPickerProps as RACColorPickerProps,
  Dialog,
  DialogTrigger,
  Popover,
} from 'react-aria-components';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { ColorSlider } from '../ColorSlider/ColorSlider';
import { ColorArea } from '../ColorArea/ColorArea';
import { ColorField } from '../ColorField/ColorField';

export interface ColorPickerProps extends RACColorPickerProps {
  label?: string;
  children?: React.ReactNode;
}

export function ColorPicker({ label, children, ...props }: ColorPickerProps) {
  return (
    <RACColorPicker {...props}>
      <DialogTrigger>
        <Button className="color-picker">
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className="color-picker-dialog">
            {children || (
              <>
                <ColorArea
                  colorSpace="hsb"
                  xChannel="saturation"
                  yChannel="brightness"
                />
                <ColorSlider colorSpace="hsb" channel="hue" />
                <ColorField
                  label="Hex"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </RACColorPicker>
  );
}
