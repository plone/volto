import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { Container } from '@plone/components';
import { Link } from '@plone/components/quanta';
import { useTranslation } from 'react-i18next';
import type { LinkCT, RootData } from '@plone/types';
import { isInternalURL } from '@plone/helpers';
import clsx from 'clsx';
import '../styles/views/link.css';

export default function LinkView() {
  const rootData = useRouteLoaderData<RootLoader>('root') as RootData<LinkCT>;
  const { t } = useTranslation();

  if (!rootData) {
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
