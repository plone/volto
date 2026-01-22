import config from '@plone/registry';
import RenderBlocks from '../blocks/RenderBlocks';
import type { RootLoader } from 'seven/app/root';
import { Container } from '@plone/components';
import { hasBlocksData } from '@plone/helpers';
import { useRouteLoaderData } from 'react-router';

export default function DefaultView() {
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <Container width="default">
      {content.title && (
        <h1 className="documentFirstHeading">{content.title}</h1>
      )}

      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}

      {content.image && (
        <Image
          className="documentImage ui right floated image"
          alt={content.title}
          title={content.title}
          item={content}
          imageField="image"
          responsive={true}
        />
      )}

      {hasBlocksData(content) && (
        <RenderBlocks
          content={content}
          blocksConfig={config.blocks.blocksConfig}
          pathname="/"
        />
      )}
    </Container>
  );
}
