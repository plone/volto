import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';
import { Pluggable } from '../Pluggable';

export const sidebarAtom = atom(true);

const sidebar = tv({
  base: 'bg-quanta-celery transition-[width] duration-200 ease-linear',
  variants: {
    collapsed: {
      false: 'w-0',
      true: 'w-[300px]',
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
      <h2 className="mt-4 text-center text-2xl">This is the sidebar</h2>
      <Pluggable name="sidebar" />
    </div>
  );
};

export default Sidebar;
