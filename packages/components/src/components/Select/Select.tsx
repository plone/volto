import type { SelectProps as RACSelectProps } from 'react-aria-components';
import {
  Button,
  FieldError,
  Label,
  ListBox,
  Popover,
  Select as RACSelect,
  SelectValue,
  Text,
} from 'react-aria-components';
import cx from 'classnames';
import ChevrondownIcon from '../Icons/ChevrondownIcon';
import ChevronupIcon from '../Icons/ChevronupIcon';

interface SelectProps<T extends object>
  extends Omit<RACSelectProps<T>, 'children'> {
  title?: string;
  description?: string;
  error?: string[];
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

/**
 * See https://react-spectrum.adobe.com/react-aria/Select.html
 *
 * An iterable list of options is passed to the Select using the items prop. Each item
 * accepts an id prop, which is passed to the onSelectionChange handler to identify
 * the selected item. Alternatively, if the item objects contain an id property, as
 * shown in the example below, then this is used automatically and an id prop is not
 * required.
 *
 * Setting a selected option can be done by using the defaultSelectedKey or selectedKey
 * prop. The selected key corresponds to the id prop of an item. When Select is used
 * with a dynamic collection as described above, the id of each item is derived from
 * the data.
 *
 */
export default function Select<T extends object>({
  title,
  description,
  error,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect {...props} className={cx('q field', `field-${props.name}`)}>
      {({ isOpen }) => (
        <>
          <Button className={cx('q input', { error: error })}>
            <SelectValue />
            {/* Next span is flexed to position the icon just in the middle */}
            <span aria-hidden="true" style={{ display: 'flex' }}>
              {isOpen ? <ChevronupIcon /> : <ChevrondownIcon />}
            </span>
          </Button>
          <Label className="q label">{title}</Label>
          <FieldError className="q assist">{error}</FieldError>
          {description && (
            <Text slot="description" className="q hint">
              {description}
            </Text>
          )}
          <Popover offset={1}>
            <ListBox className="q dropdown" items={items}>
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}
