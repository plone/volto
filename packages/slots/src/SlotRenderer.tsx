import React from 'react';
import { useAppRouter } from '@plone/providers';
import config from '@plone/registry';

import type { Content } from '@plone/types';

/*
Usage:
<SlotRenderer name="aboveContent" content={content} />
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
  const location = useAppRouter().useLocation();

  let slots = config.getSlot(name, {
    content,
    // @ts-expect-error TODO: improve the types of @plone/registry later
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
      {slots.map(({ component, name }) => {
        const SlotComponent = component;
        return (
          <SlotComponent
            key={name}
            content={content}
            location={location}
            navRoot={navRoot}
          />
        );
      })}
    </>
  );
};

export default SlotRenderer;
