import React from 'react';
import type {
  TreeItemContentProps,
  TreeItemContentRenderProps,
  TreeItemProps as RACTreeItemProps,
  TreeProps,
} from 'react-aria-components';
import {
  Button,
  TreeItemContent as RACTreeItemContent,
  TreeItem as RACTreeItem,
  Tree as RACTree,
} from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';

export interface TreeItemProps extends Partial<RACTreeItemProps> {
  title: string;
}

export function TreeItemContent(
  props: Omit<TreeItemContentProps, 'children'> & {
    children?: React.ReactNode;
  },
) {
  return (
    <RACTreeItemContent>
      {({
        hasChildItems,
        selectionBehavior,
        selectionMode,
      }: TreeItemContentRenderProps) => (
        <>
          {selectionBehavior === 'toggle' && selectionMode !== 'none' && (
            <Checkbox slot="selection" />
          )}
          <Button slot="chevron">
            <svg viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
          {props.children}
        </>
      )}
    </RACTreeItemContent>
  );
}

export function TreeItem(props: TreeItemProps) {
  return (
    <RACTreeItem textValue={props.title} {...props}>
      <TreeItemContent>{props.title}</TreeItemContent>
      {props.children}
    </RACTreeItem>
  );
}
export function Tree<T extends object>({ children, ...props }: TreeProps<T>) {
  return <RACTree {...props}>{children}</RACTree>;
}
