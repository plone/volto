import React from 'react';
import {
  Button,
  Label,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  type TagGroupProps as RACTagGroupProps,
  TagList,
  type TagListProps,
  type TagProps,
  Text,
} from 'react-aria-components';

export interface TagGroupProps<T>
  extends Omit<RACTagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <RACTagGroup {...props}>
      <Label>{label}</Label>
      <TagList items={items} renderEmptyState={renderEmptyState}>
        {children}
      </TagList>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </RACTagGroup>
  );
}

export function Tag({ children, ...props }: TagProps) {
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <RACTag textValue={textValue} {...props}>
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && <Button slot="remove">ⓧ</Button>}
        </>
      )}
    </RACTag>
  );
}
