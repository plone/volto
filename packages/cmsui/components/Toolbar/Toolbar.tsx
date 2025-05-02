import { Button } from '@plone/components/tailwind';
import { Plug, Pluggable } from '../Pluggable';
import Settings from '@plone/components/icons/settings.svg?react';
import { sidebarAtom } from '../Sidebar/Sidebar';
import { useSetAtom } from 'jotai';

const Toolbar = () => {
  const setCollapsed = useSetAtom(sidebarAtom);

  return (
    <div
      role="navigation"
      aria-label="Toolbar"
      id="toolbar"
      className="flex h-full w-[80px] justify-center transition-[left,right,width] duration-200 ease-linear"
    >
      <div className="bg-quanta-smoke fixed inset-y-0 z-10 flex w-[80px] flex-col items-center justify-between py-4">
        <Pluggable name="toolbar" />
        <Pluggable name="toolbar-bottom" />
        <Plug pluggable="toolbar-bottom" id="button-settings">
          <Button
            aria-label="Settings"
            size="L"
            onPress={() => setCollapsed((state) => !state)}
          >
            <Settings />
          </Button>
        </Plug>
      </div>
    </div>
  );
};

export default Toolbar;
