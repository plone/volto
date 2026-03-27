import {
  ToolbarMenu,
  ToolbarMenuItem,
} from '@plone/layout/components/Toolbar/ToolbarMenu';
import Add from '@plone/components/icons/add.svg?react';
import Page from '@plone/components/icons/page.svg?react';
import type { Content, GetTypesResponse, Type } from '@plone/types';
import { Header, MenuSection, Text } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import config from '@plone/registry';

import contentTypesMenuStyles from './ContentTypesMenu.css?inline';

interface ContentTypesMenuProps {
  content: Content;
}

export const ContentTypesMenu = ({ content }: ContentTypesMenuProps) => {
  const { t } = useTranslation();

  const _types: GetTypesResponse = content['@components']?.types;
  const types = Array.isArray(_types) ? _types : [];
  const addableTypes = types.filter((type) => type.addable);

  const mostUsedTypes = config.settings.mostUsedTypes;

  const hightlightedTypes = addableTypes.filter((type) =>
    mostUsedTypes.includes(type.id),
  );

  const otherTypes = addableTypes.filter(
    (type) => !mostUsedTypes.includes(type.id),
  );

  const ContentTypeMenuItem = (type: Type) => {
    const typeToAdd = type['@id'].split('@types/')[1];
    const Icon = config.settings.contentIcons[type.id] ?? Page;

    return (
      <ToolbarMenuItem id={type.id} href={`/add?type=${typeToAdd}`}>
        <Icon />
        <Text slot="label">{type.title}</Text>
      </ToolbarMenuItem>
    );
  };

  return (
    <ToolbarMenu
      className="menu-contenttypes-add"
      button={<Add />}
      styles={contentTypesMenuStyles}
    >
      <MenuSection className="most-used">
        <Header>{t('publicui.toolbar.addContent')}</Header>
        {hightlightedTypes.length > 0 &&
          hightlightedTypes.map((type) => (
            <ContentTypeMenuItem key={type.id} {...type} />
          ))}
      </MenuSection>
      <MenuSection className="types">
        {otherTypes.length > 0 &&
          otherTypes.map((type) => (
            <ContentTypeMenuItem key={type.id} {...type} />
          ))}
      </MenuSection>
    </ToolbarMenu>
  );
};
