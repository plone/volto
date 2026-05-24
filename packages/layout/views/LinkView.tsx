import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { Container } from '@plone/components';
import { Link } from '@plone/components/quanta';
import { useTranslation } from 'react-i18next';
import { isInternalURL } from '@plone/helpers';
import clsx from 'clsx';

export default function LinkView() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { t } = useTranslation();

  if (!rootData || rootData.content['@type'] !== 'Link') {
    return null;
  }

  const { content } = rootData;
  const isInternal = isInternalURL(content.remoteUrl);

  return (
    <Container width="default" className="link-view">
      <h1 className="documentFirstHeading">{content.title}</h1>
      <p className="documentDescription">{content.description}</p>
      <p>
        {isInternal
          ? t('layout.views.link.linkLabel')
          : t('layout.views.link.externalLinkLabel')}
        &nbsp;
        <Link
          href={content.remoteUrl}
          target="_blank"
          rel={clsx('noopener', !isInternal && 'noreferrer')}
        >
          {content.remoteUrl}
        </Link>
      </p>
    </Container>
  );
}
