import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';

import type { Content } from '@plone/types';

/*
<SlotRenderer name="aboveContent" content={content} route={} />
*/

const SlotRenderer = ({
  name,
  content,
}: {
  name: string;
  content: Content;
}) => {
  const pathname = useLocation().pathname;

  let slots = config.getSlot<{ content: Content; pathname: string }>(name, {
    content,
    pathname,
  });

  if (!slots) {
    return null;
  }

  return (
    <>
      {slots.map(
        ({
          component,
          name,
        }: {
          component: React.ComponentType<any>;
          name: string;
        }) => {
          // ^^ Weird compilation issue for Jest tests, that forced to re-declare the type above
          const SlotComponent = component;
          return <SlotComponent key={name} />;
        },
      )}
    </>
  );
};

export default SlotRenderer;
