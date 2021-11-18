import React from 'react';
import { NavLink } from 'react-router-dom';
import config from '@plone/volto/registry';

const NavItems = ({ items, lang }) => {
  const { settings } = config;

  return (
    <>
      {items.map((item) => (
        <NavLink
          to={item.url === '' ? '/' : item.url}
          key={item.url}
          className="item"
          activeClassName="active"
          exact={
            settings.isMultilingual ? item.url === `/${lang}` : item.url === ''
          }
        >
          {item.title}
        </NavLink>
      ))}
    </>
  );
};

export default NavItems;
