import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';
import { Pluggable } from '@plone/layout/components/Pluggable';

export const sidebarAtom = atom(false);

const sidebar = tv({
  base: `
    fixed top-0 right-0 z-[150] h-screen overflow-x-hidden overflow-y-auto bg-white
    shadow-[0_12px_24px_0_var(--color-quanta-smoke)] transition-[width] duration-200 ease-linear
  `,
  variants: {
    collapsed: {
      true: 'w-0 overflow-hidden',
      false: 'w-[300px]',
    },
  },
});

const Sidebar = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useAtom(sidebarAtom);

  return (
    <aside
      aria-label={t('cmsui.sidebar.label')}
      id="sidebar"
      className={sidebar({ collapsed })}
      onFocus={() => {
        if (collapsed) {
          setCollapsed(false);
        }
      }}
    >
      {!collapsed && <Pluggable name="sidebar" />}
    </aside>
  );
};

export default Sidebar;
