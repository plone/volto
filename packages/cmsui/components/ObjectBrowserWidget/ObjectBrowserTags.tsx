import { Tag, TagGroup } from '@plone/components/quanta';
import { useObjectBrowserContext } from './ObjectBrowserContext';
import type { AriaTagGroupProps } from 'react-aria';

type ObjectBrowserTagsProps = Omit<
  AriaTagGroupProps<object>,
  'children' | 'items'
>;

export const ObjectBrowserTags = (props: ObjectBrowserTagsProps) => {
  const { selectedKeys, handleRemove } = useObjectBrowserContext();

  return (
    <TagGroup
      {...props}
      selectedKeys={Array.from(selectedKeys).map((item) => item.id)}
      className="flex w-full flex-row gap-4"
      items={Array.from(selectedKeys).map(({ id, title }) => ({
        id,
        title,
      }))}
      // @ts-ignore prop is present in react-aria but not in types somehow
      escapeKeyBehavior="none"
      onRemove={handleRemove}
      tabIndex={selectedKeys.size ? 0 : -1}
      renderEmptyState={() => (
        <span className="flex-1 text-gray-500" aria-disabled="true">
          Type something…
        </span>
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
