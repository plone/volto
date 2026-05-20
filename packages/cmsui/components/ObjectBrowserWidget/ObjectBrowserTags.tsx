import { Tag, TagGroup } from '@plone/components/quanta';
import type { ComponentProps } from 'react';
import { useObjectBrowserContext } from './ObjectBrowserContext';

type ObjectBrowserTagsProps = Omit<
  ComponentProps<typeof TagGroup>,
  'children' | 'items'
>;

// TODO: handle empty state being focusable, somehow??
export const ObjectBrowserTags = (props: ObjectBrowserTagsProps) => {
  const { selectedKeys, handleRemove } = useObjectBrowserContext();

  return (
    <TagGroup
      {...props}
      selectedKeys={Array.from(selectedKeys).map((item) => item.id) ?? []}
      className="flex w-full flex-row gap-0 py-2"
      items={
        Array.from(selectedKeys).map(({ id, title }) => ({
          id,
          title,
        })) ?? []
      }
      // @ts-ignore prop is present in react-aria but not in types somehow
      escapeKeyBehavior="none"
      onRemove={handleRemove}
      renderEmptyState={() => (
        <span className="flex-1 text-gray-500">Type something…</span>
      )}
    >
      {(item) => (
        <Tag id={item.id} key={item.id} className="text-md">
          {item.title}
        </Tag>
      )}
    </TagGroup>
  );
};

ObjectBrowserTags.displayName = 'ObjectBrowserTags';
