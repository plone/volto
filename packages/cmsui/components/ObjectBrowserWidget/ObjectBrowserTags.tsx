// Componente TagGroup estratto dal widget originale
import React from 'react';
import { Tag, TagGroup } from '@plone/components/quanta';
import { useObjectBrowserContext } from './ObjectBrowserContext';

export const ObjectBrowserTags = () => {
  const { selectedKeys, handleRemove } = useObjectBrowserContext();
  if (!selectedKeys.size) {
    return null;
  }
  return (
    <TagGroup
      selectedKeys={Array.from(selectedKeys).map((item) => item.id)}
      className="flex-row gap-4"
      items={Array.from(selectedKeys).map(({ id, title }) => ({
        id,
        title,
      }))}
      // @ts-ignore prop is present in react-aria but not in types somehow
      escapeKeyBehavior="none"
      onRemove={handleRemove}
    >
      {(item) => (
        <Tag id={item.id} key={item.id} className="text-md">
          {item.title}
        </Tag>
      )}
    </TagGroup>
  );
};
