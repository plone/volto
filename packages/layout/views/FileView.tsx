import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { useTranslation } from 'react-i18next';
import prettybytes from 'pretty-bytes';
import { Container, Link } from '@plone/components';
import type { Content } from '@plone/types';

// TODO: move this to @plone/types in some way?
type FileContent = Content & {
  '@type': 'File';
  file: {
    'content-type': string;
    download: string;
    filename: string;
    size: number;
  };
};

type Loader = (args: Parameters<RootLoader>) => Promise<
  Awaited<ReturnType<RootLoader>> & {
    content: FileContent;
  }
>;

export default function FileView() {
  const rootData = useRouteLoaderData<Loader>('root');
  const { t } = useTranslation();

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  return (
    <Container className="view-wrapper">
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.file?.download && (
        <Link href={content.file.download} download={content.file.filename}>
          {t('layout.contenttypes.common.size')}{' '}
          {prettybytes(content.file.size)}
          &nbsp; &mdash; &nbsp;
          {content.file.filename
            ? content.file.filename
            : t('layout.contenttypes.file.download')}
        </Link>
      )}
    </Container>
  );
}
