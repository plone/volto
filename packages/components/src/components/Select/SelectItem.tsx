import type { ListBoxItemProps } from 'react-aria-components';
import { ListBoxItem as RACListBoxItem } from 'react-aria-components';
import cx from 'classnames';

export function SelectItem(props: ListBoxItemProps) {
  return (
    <RACListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        cx('option', {
          focused: isFocused,
          selected: isSelected,
        })
      }
    />
  );
}
