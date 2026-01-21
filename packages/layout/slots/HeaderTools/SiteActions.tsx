import { Link } from '@plone/components/quanta';
import { useTranslation } from 'react-i18next';
import type { SlotComponentProps } from '../SlotRenderer';

const SiteActions = (props: SlotComponentProps) => {
  const { location } = props;
  const { t } = useTranslation();

  return (
    <>
      <Link href={`/@@edit${location.pathname.replace(/^\/$/, '')}`}>
        {t('layout.slots.tools.anontools.edit')}
      </Link>
      <Link href="/logout">{t('layout.slots.tools.anontools.logout')}</Link>
    </>
  );
};

export default SiteActions;
