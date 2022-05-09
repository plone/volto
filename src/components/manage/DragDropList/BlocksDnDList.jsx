import { isEmpty } from 'lodash';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import BlocksDnDItem from './BlocksDnDItem';

const BlocksDnDList = (props) => {
  const {
    childList,
    children,
    as = 'div',
    style,
    forwardedAriaLabelledBy,
    placeholderProps,
    reactBeautifulDnd,
  } = props; //renderChild

  const AsDomComponent = as;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <SortableContext items={childList} strategy={verticalListSortingStrategy}>
      {childList
        .filter(([id, child]) => id && child) // beware numbers!
        .map(([childId, child], index) => (
          <BlocksDnDItem id={childId.toString()} index={index} key={childId} />
        ))}
    </SortableContext>
  );
};

export default injectLazyLibs(['reactBeautifulDnd'])(BlocksDnDList);
