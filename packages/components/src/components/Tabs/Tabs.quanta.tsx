import React from 'react';
import {
  composeRenderProps,
  Tabs as RACTabs,
  Tab as RACTab,
  TabPanel as RACTabPanel,
  TabList as RACTabList,
  type TabProps as RACTabProps,
  type TabListProps as RACTabListProps,
  type TabsProps as RACTabsProps,
  type TabPanelProps as RACTabPanelProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface TabsProps extends RACTabsProps {
  tabs: Array<{ id: string; title: string; content: React.ReactNode }>;
  orientation?: 'vertical' | 'horizontal';
}

const tabs = tv({
  base: '',
  variants: {
    orientation: {
      vertical: 'flex flex-row',
      horizontal: 'flex flex-col',
    },
  },
});

const tabListStyles = tv({
  base: 'flex gap-1',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
  },
});

export function TabList<T extends object>(props: RACTabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: 'flex cursor-default items-center px-4 py-1.5 text-sm font-medium transition',
  variants: {
    isSelected: {
      false: `
        text-gray-600
        hover:bg-gray-200 hover:text-gray-700
        dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200
        pressed:bg-gray-200 pressed:text-gray-700
        dark:pressed:bg-zinc-800 dark:pressed:text-zinc-200
      `,
      true: `
        bg-gray-800 text-white
        dark:bg-zinc-200 dark:text-black
        forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]
      `,
    },
    isDisabled: {
      true: `
        text-gray-200
        dark:text-zinc-600
        forced-colors:text-[GrayText]
        selected:bg-gray-200 selected:text-gray-300
        dark:selected:bg-zinc-600 dark:selected:text-zinc-500
        forced-colors:selected:bg-[GrayText] forced-colors:selected:text-[HighlightText]
      `,
    },
  },
});

export function Tab(props: RACTabProps) {
  return (
    <RACTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabProps({ ...renderProps, className }),
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: `
    flex-1 p-4 text-sm text-gray-900
    dark:text-zinc-100
  `,
});

export function TabPanel(props: RACTabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      orientation={props.orientation || 'horizontal'}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabs({
          ...renderProps,
          orientation: props.orientation,
          className,
        }),
      )}
    >
      <TabList
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            tabListStyles({
              ...renderProps,
              orientation: props.orientation || 'horizontal',
              className,
            }),
        )}
      >
        {props.tabs.map((tab) => (
          <Tab key={tab.id} id={tab.id}>
            {tab.title}
          </Tab>
        ))}
      </TabList>
      {props.tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} className={'p-3'}>
          {tab.content}
        </TabPanel>
      ))}
    </RACTabs>
  );
}
