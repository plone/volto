import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';
import type { Content, SlotComponent } from '@plone/types';

```
<SlotRenderer name="aboveContent" content={content} route={} />
```;

const SlotRenderer = ({
  name,
  content,
}: {
  name: string;
  content: Content;
}) => {
  let slots = config.getSlot<{ content: Content }>(name) as SlotComponent[];

  if (!slots) {
    return null;
  }

  return slots.map(({ component }: SlotComponent) => {
    const id = uuid();
    const SlotComponent = component;
    return <SlotComponent key={id} id={id} />;
  });
};

export default SlotRenderer;
