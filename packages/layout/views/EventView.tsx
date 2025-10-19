import { hasBlocksData } from '@plone/helpers';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import RenderBlocks from '../blocks/RenderBlocks';
import EventDetails from '../components/EventDetails/EventDetails';
import config from '@plone/registry';
import '../styles/views/event.css';
import type { EventCT, RootData } from '@plone/types';

export default function EventView() {
  const rootData = useRouteLoaderData<RootLoader>('root') as RootData<EventCT>;

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  if (hasBlocksData(content)) {
    return (
      <div className="event-view">
        <div className="desktop">
          <div className="column">
            <RenderBlocks
              content={content}
              blocksConfig={config.blocks.blocksConfig}
              pathname="/"
            />
          </div>
          <div className="column">
            <EventDetails data={rootData} />
          </div>
        </div>
        <div className="mobile">
          <div className="column">
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
          <div className="column">
            <EventDetails data={rootData} />
          </div>
          <div className="column">
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
        </div>
      </div>
    );
  }

  return <h1>{content.title}</h1>;
}
