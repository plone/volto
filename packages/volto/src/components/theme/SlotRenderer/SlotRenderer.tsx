import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';
import type { Location } from 'history';
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
  const location = useLocation();

  let slots = config.getSlot(name, {
    content,
    location: location as Location,
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
