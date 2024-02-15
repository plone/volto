import {
  type RowProps,
  Row as RACRow,
  Cell,
  Collection,
  useTableOptions,
  Button,
} from 'react-aria-components';
import './Row.scss';
import Checkbox from '../Checkbox/Checkbox';
import Draggable from '../Icons/DraggableIcon';

export default function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <RACRow id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag" aria-label="Drag">
            <Draggable />
          </Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACRow>
  );
}
