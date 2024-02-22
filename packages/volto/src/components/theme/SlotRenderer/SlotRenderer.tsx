import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';
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
      {slots.map((component: React.ComponentType<any>) => {
        // Weird compilation issue, ^^ that forced to re-declare the type above
        const id = uuid();
        const SlotComponent = component;
        return <SlotComponent key={id} id={id} />;
      })}
    </>
  );
};

export default SlotRenderer;
