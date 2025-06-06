import React from 'react';
import { NavLink } from 'react-router-dom';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import config from '@plone/volto/registry';

const NavItem = ({ item, lang }) => {
  const { settings } = config;
  // The item.url in the root is ''
  // TODO: make more consistent it everywhere (eg. reducers to return '/' instead of '')
  if (isInternalURL(item.url) || item.url === '') {
    return (
      <NavLink
        to={item.url === '' ? '/' : item.url}
        key={item.url}
        className="item"
        activeClassName="active"
        exact={item.url === '' || item.url === `/${toBackendLang(lang)}`}
      >
        {item.title}
      </NavLink>
    );
  } else {
    return (
      <a
        href={item.url}
        key={item.url}
        className="item"
        rel="noopener noreferrer"
        target={settings.openExternalLinkInNewTab ? '_blank' : '_self'}
      >
        {item.title}
      </a>
    );
  }
};

export default NavItem;
