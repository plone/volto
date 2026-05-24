import { useRouteLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import prettybytes from 'pretty-bytes';
import { Container, Link } from '@plone/components';
import type { RootLoader } from 'seven/app/root';

export default function FileView() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { t } = useTranslation();

  if (!rootData || rootData.content['@type'] !== 'File') {
    return null;
  }

  const { content } = rootData;

  return (
    <Container width="default">
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
