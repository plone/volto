import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';
import type { GetSlotArgs } from '@plone/types';

export interface SlotRendererProps extends GetSlotArgs {
  name: string;
}

/*
Usage:
<SlotRenderer name="aboveContent" content={content} />
*/

const SlotRenderer = ({
  name,
  content,
  navRoot,
  data,
  ...rest
}: SlotRendererProps) => {
  const location = useLocation();

  let slots = config.getSlot(name, {
    ...rest,
    content,
    location: location as any, // Since we are using an older version of history, we need to cast it to any
    // This is to cover the use case while adding a new content and we don't have
    // have the navRoot information in the initial content. This will be
    // useful for SlotRenderers rendered in the `Add` route.
    navRoot: content?.['@components']?.navroot?.navroot || navRoot,
    data,
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
              {...rest}
              key={name}
              content={content}
              location={location}
              navRoot={navRoot}
              data={data}
            />
          );
        },
      )}
    </>
  );
};

export default SlotRenderer;
