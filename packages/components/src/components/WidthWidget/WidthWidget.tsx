import React from 'react';
import {
  CustomRadio,
  RadioGroup,
  type RadioGroupProps,
} from '../RadioGroup/RadioGroup.quanta';
import { ImagewideIcon } from '../../components/icons/ImagewideIcon';
import { ImagefitIcon } from '../../components/icons/ImagefitIcon';
import { ImagefullIcon } from '../../components/icons/ImagefullIcon';
import { ImagenarrowIcon } from '../../components/icons/ImagenarrowIcon';

interface WidthWidgetProps extends Omit<RadioGroupProps, 'children'> {
  id?: string;
  actions?: string[];
  actionsInfoMap?: Record<string, [React.ComponentType<any>, string]>;
}

export const defaultActionsInfo: Record<
  string,
  [React.ComponentType<any>, string]
> = {
  narrow: [ImagenarrowIcon, 'Narrow'],
  default: [ImagefitIcon, 'Default'],
  layout: [ImagewideIcon, 'Layout'],
  full: [ImagefullIcon, 'Full'],
};

export function WidthWidget(props: WidthWidgetProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
    onChange,
    actions = ['narrow', 'default', 'layout', 'full'],
    actionsInfoMap,
    ...radioGroupProps
  } = props;

  const actionsInfo = {
    ...defaultActionsInfo,
    ...actionsInfoMap,
  };

  const handleChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <RadioGroup
      {...radioGroupProps}
      onChange={handleChange}
      orientation="horizontal"
    >
      {actions.map((action) => {
        const [IconComponent, label] = actionsInfo[action];
        return (
          <CustomRadio key={action} value={action}>
            <IconComponent size="base" aria-label={label} />
          </CustomRadio>
        );
      })}
    </RadioGroup>
  );
}
