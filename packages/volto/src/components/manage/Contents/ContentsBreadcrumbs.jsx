import React from 'react';
import { Breadcrumbs, Breadcrumb, Menu, MenuItem } from '@plone/components';
import { useSelector } from 'react-redux';
import { SlashIcon, MoreoptionsIcon } from '@plone/components/Icons';
import ContentsBreadcrumbsRootItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsRootItem';
import ContentsBreadcrumbsHomeItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsHomeItem';

const ContentsBreadcrumbs = (props) => {
  const { items } = props;
  const navroot = useSelector((state) => state.navroot.data.navroot);
  const navrootIsPortal = navroot?.['@type'] === 'Plone Site';
  const inner = items ? items.slice(0, -1) : [];
  const last = items ? items[items.length - 1] : null;

  return (
    <Breadcrumbs>
      {navrootIsPortal ? (
        <Breadcrumb href={'/contents'} separator={<SlashIcon size="sm" />}>
          <ContentsBreadcrumbsHomeItem />
        </Breadcrumb>
      ) : (
        <>
          <Breadcrumb href={'/contents'} separator={<SlashIcon size="sm" />}>
            <ContentsBreadcrumbsRootItem />
          </Breadcrumb>
          <Breadcrumb
            href={`${navroot?.['@id']}/contents`}
            title={navroot?.title}
            separator={<SlashIcon size="sm" />}
          >
            {navroot?.title}
          </Breadcrumb>
        </>
      )}
      {inner.length > 0 && (
        <Breadcrumb separator={<SlashIcon size="sm" />}>
          <Menu
            items={inner}
            button={<MoreoptionsIcon size="sm" />}
            placement="bottom"
          >
            {(item) => (
              <MenuItem id={item.url} href={`${item.url}/contents`}>
                {item.title}
              </MenuItem>
            )}
          </Menu>
        </Breadcrumb>
      )}
      <Breadcrumb href={last?.url} separator={<SlashIcon size="sm" />}>
        {last?.title}
      </Breadcrumb>
    </Breadcrumbs>
  );
};

export default ContentsBreadcrumbs;
