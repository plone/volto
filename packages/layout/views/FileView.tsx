import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { useTranslation } from 'react-i18next';
import { Container, Link } from '@plone/components';

export default function FileView() {
  const rootData = useRouteLoaderData<RootLoader>('root');
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
          {content.file.filename
            ? content.file.filename
            : t('layout.FileView.download')}
        </Link>
      )}
    </Container>
  );
}
