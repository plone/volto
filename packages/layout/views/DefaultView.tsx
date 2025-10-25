import { hasBlocksData } from '@plone/helpers';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import RenderBlocks from '../blocks/RenderBlocks';
import config from '@plone/registry';

export default function DefaultView() {
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  if (hasBlocksData(content)) {
    return (
      <>
        <RenderBlocks
          content={content}
          blocksConfig={config.blocks.blocksConfig}
          pathname="/"
        />
      </>
    );
  }

  return <h1>{content.title}</h1>;
}
