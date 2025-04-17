import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';

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
      Algo a dins
    </div>
  );
};

export default Sidebar;
