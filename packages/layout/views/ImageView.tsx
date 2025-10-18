import { Container } from '@plone/components';
import { flattenToAppURL } from '@plone/helpers';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { useTranslation } from 'react-i18next';
import prettybytes from 'pretty-bytes';

export default function ImageView() {
  const { t } = useTranslation();
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { content } = rootData;

  return (
    <Container>
      <h1 className="documentFirstHeading">{content.title}</h1>
      <p className="documentDescription">{content.description}</p>
      {content.image?.download ? (
        <a href={flattenToAppURL(content.image.download)}>
          <figure>
            <img src={content.image.download} alt="" />
            <figcaption>
              {t('publicui.contenttypes.image.size')}
              {prettybytes(content.image.size)}
              &nbsp; &mdash; &nbsp;
              {t('publicui.contenttypes.image.download')}
            </figcaption>
          </figure>
        </a>
      ) : (
        <span>No image</span>
      )}
    </Container>
  );
}
