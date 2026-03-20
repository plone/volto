import { useAtom } from 'jotai';
import { sidebarAtom } from '../Sidebar/Sidebar';
import Settings from '@plone/components/icons/settings.svg?react';

export const ToolbarSettings = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collapsed, setCollapsed] = useAtom(sidebarAtom);

  return (
    <button
      type="button"
      aria-label="Settings"
      onClick={() => setCollapsed((state) => !state)}
    >
      <Settings />
    </button>
  );
};
