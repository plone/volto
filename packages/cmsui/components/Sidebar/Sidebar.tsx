import { Fragment } from 'react';
import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';
import { Pluggable } from '@plone/layout/components/Pluggable';

export const sidebarAtom = atom(true);

const sidebar = tv({
  base: `
    shadow-[0_12px_24px_0_var(--color-quanta-smoke)] transition-[width] duration-200 ease-linear
  `,
  variants: {
    collapsed: {
      true: 'w-0',
      false: 'w-[300px]',
    },
  },
});

const Sidebar = () => {
  const [collapsed] = useAtom(sidebarAtom);

  return (
    <div
      role="complementary"
      aria-label="Sidebar"
      id="sidebar"
      className={sidebar({ collapsed })}
    >
      {!collapsed && (
        <Fragment>
          <Pluggable name="sidebar" />
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
