import React from 'react';
import { NavLink } from 'react-router-dom';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router';

const NavItem = ({ item, lang }) => {
  const { settings } = config;
  // The item.url in the root is ''
  // TODO: make more consistent it everywhere (eg. reducers to return '/' instead of '')
  const location = useLocation();
  const unprefixedLocation = {
    ...location,
    pathname: location.pathname.replace(
      settings.prefixPath ? `/${settings.prefixPath}` : '',
      '',
    ),
  };

  if (isInternalURL(item.url) || item.url === '') {
    return (
      <NavLink
        to={item.url === '' ? '/' : item.url}
        key={item.url}
        className="item"
        activeClassName="active"
        location={unprefixedLocation}
        exact={
          settings.isMultilingual ? item.url === `/${lang}` : item.url === ''
        }
        isActive={(match, location) => !!match}
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
