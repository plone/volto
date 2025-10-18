import { Container, Link } from '@plone/components';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { useTranslation } from 'react-i18next';
import prettybytes from 'pretty-bytes';
import Image from '../components/Image/Image';

export default function ImageView() {
  const { t } = useTranslation();
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  return (
    <Container width="default">
      <h1 className="documentFirstHeading">{content.title}</h1>
      <p className="documentDescription">{content.description}</p>
      {content.image?.download ? (
        <Link href={content.image.download} download={content.image.filename}>
          <figure>
            <Image src={content.image.download} alt="" />
            <figcaption>
              {t('layout.contenttypes.image.size')}
              {prettybytes(content.image.size)}
              &nbsp; &mdash; &nbsp;
              {t('layout.contenttypes.image.download')}
            </figcaption>
          </figure>
        </Link>
      ) : (
        <span>No image</span>
      )}
    </Container>
  );
}
