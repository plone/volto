import { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';
import { Pluggable } from '@plone/layout/components/Pluggable';

export const sidebarAtom = atom(false);

const sidebar = tv({
  base: 'bg-quanta-celery transition-[width] duration-200 ease-linear',
  variants: {
    collapsed: {
      true: 'w-0',
      false: 'w-[300px]',
    },
  },
});

const Sidebar = () => {
  const { t } = useTranslation();
  const [collapsed] = useAtom(sidebarAtom);
  const button = useRef<HTMLButtonElement>(null);

  return (
    <aside
      aria-label={t('cmsui.sidebar.label')}
      id="sidebar"
      className={sidebar({ collapsed })}
      tabIndex={-1}
      onFocus={(e) => {
        if (collapsed) {
          e.currentTarget.blur();
        } else {
          button.current?.focus();
        }
      }}
    >
      {!collapsed && (
        <Fragment>
          <button ref={button}>sidebar tabs will be here</button>
          <Pluggable name="sidebar" />
        </Fragment>
      )}
    </aside>
  );
};

export default Sidebar;
