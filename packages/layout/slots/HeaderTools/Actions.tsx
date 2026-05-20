import { Link } from '@plone/components';
import { useTranslation } from 'react-i18next';

const Actions = () => {
  const { t } = useTranslation();

  return (
    <Link href="/logout">{t('layout.slots.tools.siteActions.logout')}</Link>
  );
};

export default Actions;
