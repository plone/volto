import { Button } from '@plone/components/quanta';
import { Plug, Pluggable } from '@plone/layout/components/Pluggable';
import Settings from '@plone/components/icons/settings.svg?react';
import Close from '@plone/components/icons/close.svg?react';
import { sidebarAtom } from '../Sidebar/Sidebar';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router';

const Toolbar = () => {
  const setCollapsed = useSetAtom(sidebarAtom);
  const navigate = useNavigate();

  return (
    <div
      role="navigation"
      aria-label="Toolbar"
      id="toolbar"
      className={`
        flex h-full w-[80px] justify-center bg-quanta-smoke transition-[left,right,width]
        duration-200 ease-linear
      `}
    >
      <div className="fixed inset-y-0 z-10 my-4 flex flex-col items-center gap-4">
        <Pluggable name="toolbar-top" />
        <Pluggable name="toolbar-bottom" />
        <Plug pluggable="toolbar-bottom" id="button-cancel">
          <Button aria-label="Cancel" size="L" onPress={() => navigate('/')}>
            <Close />
          </Button>
        </Plug>
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
