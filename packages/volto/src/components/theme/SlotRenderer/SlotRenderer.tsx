import { matchPath, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';
import type { Content, Slot } from '@plone/types';

const SlotRenderer = ({
  name,
  content = {},
}: {
  name: string;
  content: Content;
}) => {
  const pathname = useLocation().pathname;

  // First I ask for the slots registered per dependencies
  let slots = config.getSlot({
    name,
    dependencies: content['@type'],
  });

  if (!slots) {
    slots = config.getSlot({ name });
  }

  if (!slots) {
    return null;
  }

  const active = slots.filter((slot: Slot) =>
    matchPath(pathname, { path: slot.route, exact: slot.exact }),
  );

  return active.map(({ component, props }: Slot) => {
    const id = uuid();
    const SlotComponent = component;
    return <SlotComponent {...props} key={id} id={id} />;
  });
};

export default SlotRenderer;
