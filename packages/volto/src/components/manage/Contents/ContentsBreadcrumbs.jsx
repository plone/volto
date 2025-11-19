import React from 'react';
import { Breadcrumbs, Breadcrumb, Menu, MenuItem } from '@plone/components';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ChevronrightIcon, MoreoptionsIcon } from '@plone/components/Icons';
import ContentsBreadcrumbsRootItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsRootItem';
import ContentsBreadcrumbsHomeItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsHomeItem';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  root: {
    id: 'Root',
    defaultMessage: 'Root',
  },
});

const ContentsBreadcrumbs = (props) => {
  const { items } = props;
  const intl = useIntl();
  const navroot = useSelector((state) => state.navroot.data.navroot);
  const navrootIsPortal = navroot?.['@type'] === 'Plone Site';
  const inner = items ? items.slice(0, -1) : [];
  const last = items ? items[items.length - 1] : null;

  return (
    <Breadcrumbs>
      {navrootIsPortal ? (
        <Breadcrumb
          href={'/contents'}
          separator={<ChevronrightIcon size="sm" />}
        >
          <ContentsBreadcrumbsHomeItem />
        </Breadcrumb>
      ) : (
        <>
          <Breadcrumb
            href={'/contents'}
            separator={<ChevronrightIcon size="sm" />}
          >
            <ContentsBreadcrumbsRootItem />
          </Breadcrumb>
          <Breadcrumb
            href={`${navroot?.['@id']}/contents`}
            title={navroot?.title}
            separator={<ChevronrightIcon size="sm" />}
          >
            {navroot?.title}
          </Breadcrumb>
        </>
      )}
      {inner.length > 0 && (
        <Breadcrumb separator={<ChevronrightIcon size="sm" />}>
          <Menu
            items={inner}
            className="breadcrumbs-menu"
            button={<MoreoptionsIcon size="sm" />}
            placement="bottom"
          >
            {(item) => (
              <MenuItem id={item.url}>
                <Link
                  to={`${item.url}/contents`}
                  className="menu-item-link"
                  title={intl.formatMessage(messages.home)}
                >
                  {item.title}
                </Link>
              </MenuItem>
            )}
          </Menu>
        </Breadcrumb>
      )}
      <Breadcrumb href={last?.url} separator={<ChevronrightIcon size="sm" />}>
        {last?.title}
      </Breadcrumb>
    </Breadcrumbs>
  );
};

export default ContentsBreadcrumbs;
