import { Link } from 'react-aria-components';
import { useCallback } from 'react';

import Close from '@plone/components/icons/close.svg?react';
import { useTranslation } from 'react-i18next';

interface ToolbarCancelProps {
  location: Location;
}

export const ToolbarCancel = ({ location }: ToolbarCancelProps) => {
  const { t } = useTranslation();

  const getReturnLocation = useCallback(() => {
    const path = location.pathname.startsWith('/')
      ? location.pathname.slice(1)
      : location.pathname;

    const paths = path.split('/');

    const returnPath = paths
      .filter((segment) => segment !== '@@edit')
      .join('/');

    return `/${returnPath}`;
  }, [location.pathname]);

  return (
    <Link aria-label={t('cmsui.cancel')} href={getReturnLocation()}>
      <Close />
    </Link>
  );
};
