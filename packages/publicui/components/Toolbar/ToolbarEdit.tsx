import { Link } from 'react-aria-components';
import Pencil from '@plone/components/icons/pencil.svg?react';
import { useTranslation } from 'react-i18next';

interface ToolbarEditProps {
  location: Location;
}

export const ToolbarEdit = ({ location }: ToolbarEditProps) => {
  const { t } = useTranslation();

  return (
    <Link
      className="primary"
      aria-label={t('publicui.toolbar.edit')}
      href={`/@@edit${location.pathname.replace(/^\/$/, '')}`}
    >
      <Pencil />
    </Link>
  );
};
