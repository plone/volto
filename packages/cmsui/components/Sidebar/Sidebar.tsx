import { Fragment, useRef, type ComponentPropsWithRef } from 'react';
import { FocusScope } from 'react-aria';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { tv } from 'tailwind-variants';
import { Button } from '@plone/components/quanta';
import { Pluggable } from '@plone/layout/components/Pluggable';
import { selectedBlockAtom } from '../../components/BlockEditor/BlockEditor';
import BlockSettingsForm from '../../components/BlockEditor/BlockSettingsForm';

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

const Sidebar = ({ ref }: ComponentPropsWithRef<'div'>) => {
  const { t } = useTranslation();
  const [collapsed] = useAtom(sidebarAtom);
  const button = useRef<HTMLButtonElement>(null);

  return (
    // TODO use <aside> instead?
    <div
      ref={ref}
      role="complementary"
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
          {/* <FocusScope contain={false} restoreFocus>
            <BlockSettingsForm
              schema={schema}
              block={props.block}
              // data={props.data}
            />
            <Button
              onClick={() => {
                // setFocusInSidebar(false);
                blockRef.current?.focus();
              }}
            >
              {t('cmsui.blocks-editor.back-to-block')}
            </Button>
          </FocusScope> */}
          <Pluggable name="sidebar" />
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
