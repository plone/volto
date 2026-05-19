import { hasBlocksData } from '@plone/helpers';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import RenderBlocks from '../blocks/RenderBlocks';
import EventDetails from '../components/EventDetails/EventDetails';
import config from '@plone/registry';
import '../styles/views/event.css';
import type { EventCT, RootData } from '@plone/types';
import { Container } from '@plone/components';

export default function EventView() {
  const rootData = useRouteLoaderData<RootLoader>('root') as RootData<EventCT>;

  if (!rootData) {
    return null;
  }

  const { content } = rootData;
  const hasBlocks = hasBlocksData(content);

  return (
    <Container width="default" className="event-view">
      {hasBlocks && (
        <>
          <div className="title">
            <RenderBlocks
              content={{
                ...content,
                blocks_layout: {
                  items: content.blocks_layout.items.slice(0, 1),
                },
              }}
              blocksConfig={config.blocks.blocksConfig}
              pathname="/"
            />
          </div>
          <EventDetails data={rootData} />
          <div className="content">
            <RenderBlocks
              content={{
                ...content,
                blocks_layout: {
                  items: content.blocks_layout.items.slice(1),
                },
              }}
              blocksConfig={config.blocks.blocksConfig}
              pathname="/"
            />
          </div>
        </>
      )}
      {!hasBlocks && (
        <>
          <h1 className="documentFirstHeading">{content.title}</h1>
          {Boolean(content.description) && (
            <p className="documentDescription">{content.description}</p>
          )}
        </>
      )}
    </Container>
  );
}
