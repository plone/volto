import { useRouterLocation } from '@plone/providers';
import config from '@plone/registry';

import type { Content } from '@plone/types';

/*
Usage:
<SlotRenderer name="aboveContent" content={content} route={} />
*/

const SlotRenderer = ({
  name,
  content,
  navRoot,
}: {
  name: string;
  content: Content;
  navRoot?: Content;
}) => {
  const pathname = useRouterLocation().pathname;

  let slots = config.getSlot(name, {
    content,
    pathname,
    // This is to cover the use case while adding a new content and we don't have
    // have the navRoot information in the initial content. This will be
    // useful for SlotRenderers rendered in the `Add` route.
    navRoot: content?.['@components']?.navroot?.navroot || navRoot,
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
          return (
            <SlotComponent
              key={name}
              content={content}
              pathname={pathname}
              navRoot={navRoot}
            />
          );
        },
      )}
    </>
  );
};

export default SlotRenderer;
