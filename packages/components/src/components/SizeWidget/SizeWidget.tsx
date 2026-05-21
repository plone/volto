import React from 'react';

import {
  CustomRadio,
  RadioGroup,
  type RadioGroupProps,
} from '../RadioGroup/RadioGroup.quanta';

interface SizeWidgetProps extends Omit<RadioGroupProps, 'children'> {
  id?: string;
  actions?: string[];
  actionsInfoMap?: Record<string, [string, string]>;
}

export const defaultSizeActionsInfo: Record<string, [string, string]> = {
  s: ['S', 'Small'],
  m: ['M', 'Medium'],
  l: ['L', 'Large'],
};

export function SizeWidget(props: SizeWidgetProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
    onChange,
    actions = ['s', 'm', 'l'],
    actionsInfoMap,
    ...radioGroupProps
  } = props;

  const actionsInfo = {
    ...defaultSizeActionsInfo,
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
      orientation={props.orientation || 'horizontal'}
    >
      {actions.map((action) => (
        <CustomRadio key={action} value={action}>
          <span aria-label={actionsInfo[action][1]}>
            {actionsInfo[action][0]}
          </span>
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}

export default SizeWidget;
