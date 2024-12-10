import React from 'react';
import config from '@plone/registry';

import type { GetSlotArgs } from '@plone/types';

/*
Usage:
<SlotRenderer name="aboveContent" content={content} route={} />
*/

const SlotRenderer = ({
  name,
  content,
  location,
  navRoot,
}: {
  name: string;
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
  navRoot?: GetSlotArgs['navRoot'];
}) => {
  const slots = config.getSlot(name, {
    content,
    location,
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
              location={location}
              navRoot={navRoot}
            />
          );
        },
      )}
    </>
  );
};

export default SlotRenderer;
