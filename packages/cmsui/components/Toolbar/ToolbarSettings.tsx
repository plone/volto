import { useAtom } from 'jotai';
import { sidebarAtom } from '../Sidebar/Sidebar';
import Settings from '@plone/components/icons/settings.svg?react';
import { useTranslation } from 'react-i18next';

export const ToolbarSettings = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collapsed, setCollapsed] = useAtom(sidebarAtom);

  return (
    <button
      type="button"
      aria-label={t('cmsui.toolbar.settings')}
      title={t('cmsui.toolbar.settings')}
      onClick={() => setCollapsed((state) => !state)}
    >
      <Settings />
    </button>
  );
};
