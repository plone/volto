import React from 'react';
import { NavLink } from 'react-router-dom';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

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
        exact={
          settings.isMultilingual ? item.url === `/${lang}` : item.url === ''
        }
        isActive={(match, location) => {
          const active = match
            ? match.isExact
              ? true
              : matchPath(location.pathname, {
                  path: match.path,
                  exact: false,
                  strict: false,
                })
            : false;

          return active;
        }}
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
      >
        {item.title}
      </a>
    );
  }
};

export default NavItem;
