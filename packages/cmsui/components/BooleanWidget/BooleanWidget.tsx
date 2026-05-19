import { Checkbox } from '@plone/components/quanta';

interface BooleanWidgetProps {
  label?: string;
  defaultValue?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export function BooleanWidget({
  label,
  defaultValue,
  value,
  onChange,
}: BooleanWidgetProps) {
  const controlled = value !== undefined;
  return (
    <Checkbox
      {...(controlled
        ? { isSelected: value }
        : { defaultSelected: defaultValue })}
      onChange={onChange}
    >
      {label}
    </Checkbox>
  );
}

BooleanWidget.displayName = 'BooleanWidget';
