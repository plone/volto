import React from 'react';
import { Breadcrumbs, Breadcrumb, Menu, MenuItem } from '@plone/components';
import { useSelector } from 'react-redux';
import { SlashIcon, MoreoptionsIcon } from '@plone/components/Icons';
import ContentsBreadcrumbsRootItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsRootItem';
import ContentsBreadcrumbsHomeItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsHomeItem';

const middleTruncate = (str, maxLength = 30) => {
  if (!str || str.length <= maxLength) return str;

  const ellipsis = '…';
  const charsToShow = maxLength - ellipsis.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return str.slice(0, frontChars) + ellipsis + str.slice(-backChars);
};

const ContentsBreadcrumbs = (props) => {
  const MAX_TITLE_LENGTH = 30;
  const { items } = props;
  const navroot = useSelector((state) => state.navroot.data.navroot);
  const navrootIsPortal = navroot?.['@type'] === 'Plone Site';
  const inner = items ? items.slice(0, -2) : [];
  const secondLast =
    items && items.length >= 2 ? items[items.length - 2] : null;
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
                {item.nav_title || item.title}
              </MenuItem>
            )}
          </Menu>
        </Breadcrumb>
      )}
      {secondLast && (
        <Breadcrumb
          href={`${secondLast?.url}/contents`}
          title={secondLast.nav_title || secondLast?.title}
          separator={<SlashIcon size="sm" />}
        >
          <span title={secondLast.nav_title || secondLast?.title}>
            {middleTruncate(
              secondLast.nav_title || secondLast?.title,
              MAX_TITLE_LENGTH,
            )}
          </span>
        </Breadcrumb>
      )}
      {last && (
        <Breadcrumb title={last.nav_title || last?.title}>
          <span title={last.nav_title || last?.title}>
            {middleTruncate(last.nav_title || last?.title, MAX_TITLE_LENGTH)}
          </span>
        </Breadcrumb>
      )}
    </Breadcrumbs>
  );
};

export default ContentsBreadcrumbs;
